import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    dateOfBirth: {
        type: Date,
        required: false
    },

    // Professional Information
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    dateOfJoining: {
        type: Date,
        required: true,
        default: Date.now
    },
    skills: [{
        type: String,
        trim: true
    }],

    // Additional Information
    address: {
        type: String,
        trim: true
    },
    emergencyContactName: {
        type: String,
        trim: true
    },
    emergencyContactPhone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    profileImage: {
        type: String, // URL or base64 string for the image
        default: null
    },

    // Status and Metadata
    status: {
        type: String,
        enum: ['active', 'inactive', 'terminated', 'on_leave'],
        default: 'active'
    },
    isActive: {
        type: Boolean,
        default: true
    },

    // Audit fields
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
employeeSchema.virtual('fullName').get(function() {
    return this.name;
});

// Virtual for age calculation
employeeSchema.virtual('age').get(function() {
    if (!this.dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// Virtual for years of service
employeeSchema.virtual('yearsOfService').get(function() {
    if (!this.dateOfJoining) return 0;
    const today = new Date();
    const joiningDate = new Date(this.dateOfJoining);
    let years = today.getFullYear() - joiningDate.getFullYear();
    const monthDiff = today.getMonth() - joiningDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joiningDate.getDate())) {
        years--;
    }
    return Math.max(0, years);
});

// Index for better query performance
employeeSchema.index({ email: 1 });
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ isActive: 1 });

// Pre-save middleware to validate data
employeeSchema.pre('save', function(next) {
    // Ensure employeeId is unique and properly formatted
    if (this.isModified('employeeId')) {
        this.employeeId = this.employeeId.toUpperCase().trim();
    }
    
    // Ensure name is properly formatted
    if (this.isModified('name')) {
        this.name = this.name.trim().replace(/\s+/g, ' ');
    }
    
    // Validate salary
    if (this.salary && this.salary < 0) {
        return next(new Error('Salary cannot be negative'));
    }
    
    next();
});

// Static method to find active employees
employeeSchema.statics.findActive = function() {
    return this.find({ isActive: true, status: 'active' });
};

// Static method to find employees by department
employeeSchema.statics.findByDepartment = function(departmentId) {
    return this.find({ department: departmentId, isActive: true });
};

// Instance method to get employee summary
employeeSchema.methods.getSummary = function() {
    return {
        id: this._id,
        name: this.name,
        employeeId: this.employeeId,
        email: this.email,
        designation: this.designation,
        department: this.department,
        status: this.status,
        yearsOfService: this.yearsOfService,
        age: this.age
    };
};

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;