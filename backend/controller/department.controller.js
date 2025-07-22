import Department from "../model/departments.js";

export const addDepartment = async(req, res)=>{
    try{
        const {name, description}= req.body;
        const newDepartment = await Department.create({name, description});
        if(newDepartment){
            res.status(201).json({success:true, message: "Department created successfully", data: newDepartment});
        }
        else{
            res.status(400).json({ success: false, message: "Failed to create department"});
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const getDepartments = async(req, res)=>{
    try {
        const departments = await Department.find();
        if(departments){
            res.status(200).json({success:true, data: departments});
        }
        else{
            res.status(404).json({success:false, message: "No departments found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server issue", error})

    }
}
export const deleteDepartment = async(req, res)=>{
    try {
        await Department.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Department deleted successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Something is wrong" });
    }
}

export const updateDepartment = async(req, res)=>{
    try{
        const {name, description}= req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(req.body.id, {name, description}, {new:true});
        if(updatedDepartment){
            res.status(200).json({success:true, message: "Department updated successfully", data: updatedDepartment});
        }
        else{
            res.status(400).json({ success: false, message: "Failed to update department"})
        }



    }
    catch(error){
        console.log(error);
         res.status(500).json({success:false, message: "Internal server error"});
    }
}