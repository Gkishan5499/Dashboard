import User from "../model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


// user Login 

   export const login = async(req, res)=>{
       try {
         const {email, password} = req.body;
         const user = await User.findOne({email});
         if(!user){
            return res.status(404).json({success:false, message:"User not found" });
         }
         const isMatch =  await bcrypt.compare(password, user.password);
         if(!isMatch){
            return res.status(404).json({success:false, message:"Invalid password" });
         }
         const token = jwt.sign({id:user._id, role:user.role,}, process.env.JWT_KEY, {
            expiresIn: "10h",
         });
         res.status(200).json({success:true, message:"Logged in successfully", token , user:{_id: user._id, name: user.name, role: user.role}});

        
       } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal server error" });
       }
   }

   export const verify = async(req, res)=>{
      console.log("Verify route hit");
      res.status(200).json({ success: true, message: "User verified", user: req.user });
   }
