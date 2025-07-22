import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./router/user.router.js"
import emplyRouter from "./router/employee.router.js"
import projectRouter from "./router/project.router.js"
import departmentRouter from "./router/department.router.js"
import transactionRouter from "./router/transaction.router.js"


import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}` );

})

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb");

}).catch((error)=>{
    console.log(error);
})

app.use('/api/user/', userRouter);
app.use('/api/employee/', emplyRouter);
app.use('/api/project/', projectRouter);
app.use('/api/department/',departmentRouter);
app.use('/api/transaction/',transactionRouter);

