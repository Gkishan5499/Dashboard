import mongoose from "mongoose";
const depSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true     
    }

}, { timestamps: true });
const Department = mongoose.model('Department', depSchema);
export default Department;