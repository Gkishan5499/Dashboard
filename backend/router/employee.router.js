import express from "express";
import {createEmployee, deleteEmployee, getAllEmployees, getProfile, upload } from "../controller/employee.controller.js";
import { authMiddleware } from "../middleWare/authMiddleware.js";
const router = express.Router();

router.post('/register',  authMiddleware, createEmployee);
router.get('/employee-list', authMiddleware ,getAllEmployees);
router.delete('/delete/:id', authMiddleware, deleteEmployee);
router.get('/getProfile/:id',authMiddleware, getProfile);

export default router;

 