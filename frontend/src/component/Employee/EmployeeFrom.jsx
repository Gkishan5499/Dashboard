import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext, useAuth } from "../../context/AppContext";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building, 
  Briefcase, 
  Upload, 
  X, 
  Plus,
  AlertCircle,
  CheckCircle,
  Loader2,
  Save,
  Users,
  Shield
} from 'lucide-react';

const EmployeeForm = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();
    const { user } = useAuth();
    const { backendUrl } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [formStep, setFormStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Only Admin can add employees
    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-600">Only administrators can add employees to the system.</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get(backendUrl + '/api/department/all-departments');
                if (res.data.success) {
                    setDepartments(res.data.data);
                } else {
                    setErrorMessage("Failed to fetch departments.");
                }
            } catch (error) {
                console.error(error);
                setErrorMessage("Error fetching departments.");
            }
        };
        fetchDepartments();
    }, []);

    const handleSelect = async (e) => {
        const deptId = e.target.value;
        setValue("department", deptId);
        setSelectedDept(deptId);
    };

    // Image upload handler with compression
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                // Compress the image before setting it
                compressImage(reader.result, (compressedImage) => {
                    setImagePreview(compressedImage);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // Image compression function
    const compressImage = (base64String, callback) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate new dimensions (max 800x800)
            let { width, height } = img;
            const maxSize = 800;
            
            if (width > height) {
                if (width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
            callback(compressedBase64);
        };
        img.src = base64String;
    };

    // Skills management
    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    // Form validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage("");
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Authentication failed. Please log in again.");
                return;
            }

            // Prepare form data without image first
            const formData = {
                ...data,
                skills: skills
            };

            // Only add image if it exists and is not too large
            if (imagePreview) {
                // Check if the base64 string is too large (more than 1MB)
                const base64Size = Math.ceil((imagePreview.length * 3) / 4);
                if (base64Size > 1024 * 1024) {
                    toast.error("Image is too large. Please choose a smaller image.");
                    setIsSubmitting(false);
                    return;
                }
                formData.profileImage = imagePreview;
            }

            const res = await axios.post(backendUrl + '/api/employee/register', formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            });

            if (res.data.success) {
                toast.success("Employee added successfully!");
                reset();
                setSkills([]);
                setImagePreview(null);
                setFormStep(1);
            } else {
                setErrorMessage(res.data.message || "Failed to add employee.");
            }
        } catch (error) {
            console.error('Employee creation error:', error);
            if (error.response?.status === 413) {
                setErrorMessage("The data is too large. Please reduce the image size or remove some data.");
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to add employee. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (formStep < 3) setFormStep(formStep + 1);
    };

    const prevStep = () => {
        if (formStep > 1) setFormStep(formStep - 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Employee</h1>
                    <p className="text-gray-600">Fill in the employee details to add them to the system</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Step {formStep} of 3</span>
                        <span className="text-sm text-gray-500">{Math.round((formStep / 3) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(formStep / 3) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
                    {errorMessage && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                            <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                                <p className="text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        {/* Step 1: Basic Information */}
                        {formStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-blue-600" />
                                    Basic Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                placeholder="Enter full name"
                                            />
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Employee ID *
                                        </label>
                                        <input
                                            {...register("employeeId", { required: "Employee ID is required" })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                            placeholder="EMP001"
                                        />
                                        {errors.employeeId && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.employeeId.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("email", { 
                                                    required: "Email is required",
                                                    validate: value => validateEmail(value) || "Please enter a valid email"
                                                })}
                                                type="email"
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                placeholder="employee@company.com"
                                            />
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("phone", { 
                                                    required: "Phone number is required",
                                                    validate: value => validatePhone(value) || "Please enter a valid phone number"
                                                })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                placeholder="+1234567890"
                                            />
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender *
                                        </label>
                                        <select
                                            {...register("gender", { required: "Gender is required" })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.gender.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            {...register("dateOfBirth")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Professional Information */}
                        {formStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                                    Professional Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Department *
                                        </label>
                                        <select
                                            {...register("department", { required: "Department is required" })}
                                            onChange={handleSelect}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map((dept) => (
                                                <option key={dept._id} value={dept._id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.department && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.department.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Designation *
                                        </label>
                                        <input
                                            {...register("designation", { required: "Designation is required" })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                            placeholder="e.g., Senior Developer"
                                        />
                                        {errors.designation && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.designation.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Salary *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                {...register("salary", { required: "Salary is required" })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                placeholder="50000"
                                            />
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                        {errors.salary && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.salary.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Joining Date *
                                        </label>
                                        <input
                                            type="date"
                                            {...register("dateOfJoining", { required: "Joining date is required" })}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                        />
                                        {errors.dateOfJoining && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.dateOfJoining.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Skills
                                        </label>
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                                    placeholder="Add a skill"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addSkill}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                                        >
                                                            {skill}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSkill(skill)}
                                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Additional Information */}
                        {formStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                    Additional Information
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            {...register("address")}
                                            rows="3"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                            placeholder="Enter full address"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Emergency Contact Name
                                        </label>
                                        <input
                                            {...register("emergencyContactName")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                            placeholder="Emergency contact name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Emergency Contact Phone
                                        </label>
                                        <input
                                            {...register("emergencyContactPhone")}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                                            placeholder="Emergency contact phone"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Profile Image
                                        </label>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            {imagePreview && (
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setImagePreview(null)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Adding Employee...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-2" />
                                                Add Employee
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
