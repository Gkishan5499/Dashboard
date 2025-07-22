import Project from "../model/projects.model.js";

export const createProject = async(req, res)=>{
    try {
        const { name, description, budget , weblink, numberOfEmp,projectCompletion ,startDate, endDate} = req.body;

        const existName= await Project.findOne({name});
        if(existName){
            return res.status(400).json({message:"This Project already exist"})
        }
        const newProject = new Project({
            name, 
            description,
            budget,
            weblink,
            projectCompletion,
            numberOfEmp,
            startDate,
            endDate

        })
      await newProject.save();
      res.status(201).json({success:true, message:"Successfully added", project:newProject });

        
    } catch (error) {
       console.log(error);
       res.status(500).json({success:false, message:"Internal Server Error", error:error.message})
    }
    
}

export const getAllProject = async(req, res)=>{
    try{
        const project = await Project.find();
        res.status(200).json({success:true, project:project})
    }
    catch(error){
     console.log(error);
     res.status(500).json({ success:false, message:"Server not Fetched ", error:error.message})
    }
}

export const getSelectedProject = async(req, res)=>{
    try {
        const id = req.params.id;
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({success:false, message:"Project not found"})
        }
        else{
            res.status(200).json({success:true, project:project})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
}
export const deleteProject = async(req, res)=>{
    try {
        await Project.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Project deleted successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Something is wrong" });
    }
}