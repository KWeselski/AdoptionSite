import express from 'express';
import {
  createApplication,
  deleteApplication,
  getApplication,
  getApplications,
  getUserApplications,
  reviewApplication,
} from '../controllers/applicationsController.js';

import {
  authMiddleware,
  adminAuthMiddleware,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', adminAuthMiddleware, getApplications);
router.get('/user', authMiddleware, getUserApplications);
router.get('/:id', authMiddleware, getApplication);
router.put('/:id', adminAuthMiddleware, reviewApplication);
router.delete('/:id', authMiddleware, deleteApplication);
router.post('/add', authMiddleware, createApplication);

export default router;
