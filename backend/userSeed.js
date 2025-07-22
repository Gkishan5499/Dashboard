import User from "./model/user.model.js";
import bcrypt from "bcryptjs";

//admin login section
 export const userRegister = async()=>{
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password: hashedPassword,
            role:"admin"
        });

        await newUser.save();


    } catch (error) {
        console.log(error);      
        
    }
 }

 export const logout = async(req, res)=>{
    try {
        res.clearCookie('access_token');
        res.json({success:true, message:" Logged out successfully"});

        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Somthing is wrong"})
    }
 }