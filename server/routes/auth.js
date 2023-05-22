import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);

export default router;
