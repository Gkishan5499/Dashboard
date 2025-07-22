import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    employeeId:{
        type:String,
        required:true,
    },

    phone:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
},

   designation:{
    type:String,
    required:true
   },
   salary:{
        type: Number,
        required: true,
        min: 0
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },

}, {timestamps:true});
const Emply =  mongoose.model('Employee',employeeSchema);
export default Emply;