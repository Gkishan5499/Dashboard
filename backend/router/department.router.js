import express from "express";
import { addDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controller/department.controller.js";
import {verify} from '../controller/user.controller.js';
import { authMiddleware } from "../middleWare/authMiddleware.js";
const router = express.Router();

router.post('/add', addDepartment, authMiddleware, verify);
router.get('/all-departments',getDepartments,);
router.post('/delete', deleteDepartment);
router.put('/edit', updateDepartment);
export default router;