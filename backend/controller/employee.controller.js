import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import multer from "multer";
import Emply from "../model/employee.model.js";



// Generate JWT Token
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, 'public/uploads');

    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ path.extname(file.originalname));
    }
});
export const upload = multer({storage: storage});

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Emply(req.body);
    await newEmployee.save();
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};




export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Emply.find().populate('department');
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async(req, res)=>{
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if( !user){
            return res.status(404).json({ success: false, message: "User not found"});
        }
        
        else{
            res.status(200).json({success:true, employee:employee})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error", error:error.message});
    }
}
export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Emply.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};