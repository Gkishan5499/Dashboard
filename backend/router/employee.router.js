import express from "express";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    getProfile,
    getEmployeeById,
    updateEmployee,
    getEmployeesByDepartment,
    getEmployeeStats,
    upload
} from "../controller/employee.controller.js";
import { authMiddleware } from "../middleWare/authMiddleware.js";

const router = express.Router();

// Employee CRUD operations
router.post('/register', authMiddleware, createEmployee);
router.get('/employee-list', authMiddleware, getAllEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/delete/:id', authMiddleware, deleteEmployee);

// Employee profile and specialized queries
router.get('/getProfile/:userId', authMiddleware, getProfile);
router.get('/department/:departmentId', authMiddleware, getEmployeesByDepartment);
router.get('/stats/overview', authMiddleware, getEmployeeStats);

// File upload route (if needed for profile images)
router.post('/upload-image', authMiddleware, upload.single('profileImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: {
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "File upload failed",
            error: error.message
        });
    }
});

export default router;

 