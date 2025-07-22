import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        required:true
    },

    weblink:{
        type:String,
        required:true
    },
    numberOfEmp:{
        type:Number,
        required:true,
    },
    projectCompletion:{
        type:String,
        enum:["Pending","Running","Completed"],
        required:true,
    },
    startDate:{
        type:String,
       
    },
    endDate:{
        type:String,
       
    }

}, {timestamps:true});
const Project =  mongoose.model('Project', projectSchema);
export default Project;