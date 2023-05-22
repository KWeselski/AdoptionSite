import express from 'express';
import {
  checkRole,
  createUser,
  loginUser,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, checkRole);
router.post('/login', loginUser);
router.post('/register', createUser);

export default router;
