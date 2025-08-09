import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import multer from "multer";
import Employee from "../model/employee.model.js";
import path from "path";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/employees');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'employee-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Create new employee
export const createEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            phone,
            gender,
            dateOfBirth,
            department,
            designation,
            salary,
            dateOfJoining,
            skills,
            address,
            emergencyContactName,
            emergencyContactPhone,
            profileImage
        } = req.body;

        // Check if employee with same email or employeeId already exists
        const existingEmployee = await Employee.findOne({
            $or: [{ email: email.toLowerCase() }, { employeeId: employeeId.toUpperCase() }]
        });

        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: existingEmployee.email === email.toLowerCase() 
                    ? "Employee with this email already exists" 
                    : "Employee with this ID already exists"
            });
        }

        // Create new employee object
        const employeeData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            employeeId: employeeId.toUpperCase().trim(),
            phone: phone.trim(),
            gender,
            department,
            designation: designation.trim(),
            salary: Number(salary),
            dateOfJoining: new Date(dateOfJoining),
            createdBy: req.user._id, // From auth middleware
            isActive: true,
            status: 'active'
        };

        // Add optional fields if provided
        if (dateOfBirth) employeeData.dateOfBirth = new Date(dateOfBirth);
        if (skills && Array.isArray(skills)) employeeData.skills = skills;
        if (address) employeeData.address = address.trim();
        if (emergencyContactName) employeeData.emergencyContactName = emergencyContactName.trim();
        if (emergencyContactPhone) employeeData.emergencyContactPhone = emergencyContactPhone.trim();
        if (profileImage) employeeData.profileImage = profileImage;

        const newEmployee = new Employee(employeeData);
        await newEmployee.save();

        // Populate department information
        await newEmployee.populate('department');

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: newEmployee
        });

    } catch (error) {
        console.error('Employee creation error:', error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create employee"
        });
    }
};

// Get all employees with filtering and pagination
export const getAllEmployees = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            department,
            status,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build query
        let query = { isActive: true };

        // Filter by department
        if (department) {
            query.department = department;
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { employeeId: { $regex: search, $options: 'i' } },
                { designation: { $regex: search, $options: 'i' } }
            ];
        }

        // Calculate pagination
        const skip = (page - 1) * limit;
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query
        const employees = await Employee.find(query)
            .populate('department', 'name')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Get total count for pagination
        const total = await Employee.countDocuments(query);

        res.status(200).json({
            success: true,
            data: employees,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalEmployees: total,
                hasNextPage: page * limit < total,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch employees"
        });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate('department', 'name')
            .populate('createdBy', 'name email');

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        console.error('Get employee error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch employee"
        });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updateData = req.body;

        // Check if employee exists
        const existingEmployee = await Employee.findById(employeeId);
        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Check for duplicate email or employeeId if being updated
        if (updateData.email || updateData.employeeId) {
            const duplicateQuery = {
                _id: { $ne: employeeId },
                $or: []
            };

            if (updateData.email) {
                duplicateQuery.$or.push({ email: updateData.email.toLowerCase() });
            }
            if (updateData.employeeId) {
                duplicateQuery.$or.push({ employeeId: updateData.employeeId.toUpperCase() });
            }

            const duplicate = await Employee.findOne(duplicateQuery);
            if (duplicate) {
                return res.status(400).json({
                    success: false,
                    message: "Employee with this email or ID already exists"
                });
            }
        }

        // Add last modified by
        updateData.lastModifiedBy = req.user._id;

        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            updateData,
            { new: true, runValidators: true }
        ).populate('department', 'name');

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        console.error('Update employee error:', error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update employee"
        });
    }
};

// Delete employee (soft delete)
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Soft delete - mark as inactive
        employee.isActive = false;
        employee.status = 'terminated';
        employee.lastModifiedBy = req.user._id;
        await employee.save();

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {
        console.error('Delete employee error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete employee"
        });
    }
};

// Get employee profile
export const getProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const employee = await Employee.findOne({ 
            $or: [{ _id: userId }, { email: userId }] 
        }).populate('department', 'name');

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get employees by department
export const getEmployeesByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const employees = await Employee.findByDepartment(departmentId)
            .populate('department', 'name')
            .select('name employeeId email designation status');

        res.status(200).json({
            success: true,
            data: employees
        });

    } catch (error) {
        console.error('Get employees by department error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch employees"
        });
    }
};

// Get employee statistics
export const getEmployeeStats = async (req, res) => {
    try {
        const stats = await Employee.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $group: {
                    _id: null,
                    totalEmployees: { $sum: 1 },
                    totalSalary: { $sum: '$salary' },
                    avgSalary: { $avg: '$salary' }
                }
            }
        ]);

        const departmentStats = await Employee.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'departments',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'departmentInfo'
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overall: stats[0] || { totalEmployees: 0, totalSalary: 0, avgSalary: 0 },
                byDepartment: departmentStats
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch statistics"
        });
    }
};