import express from "express";
import { createProject, deleteProject, getAllProject, getSelectedProject} from "../controller/project.corntroller.js";
const router = express.Router();

router.post('/add', createProject);
router.get('/all-projects', getAllProject);
router.post('/delete', deleteProject);
router.get('/singleProject/:id', getSelectedProject);

export default router;