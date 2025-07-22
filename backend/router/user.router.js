import express from 'express';
import { login, verify} from '../controller/user.controller.js';
import { logout, userRegister } from '../userSeed.js';
import { authMiddleware} from '../middleWare/authMiddleware.js'

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', login);
router.get('/verify', authMiddleware ,verify);
router.post('/logout', logout);


export default router;