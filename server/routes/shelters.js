import express from 'express';
import {
  createShelter,
  deleteShelter,
  getShelter,
  getShelters,
  updateShelter,
} from '../controllers/shelterController.js';
import { adminAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getShelters);
router.get('/:id', getShelter);
router.post('/add', adminAuthMiddleware, createShelter);
router.put('/:id', adminAuthMiddleware, updateShelter);
router.delete('/:id', adminAuthMiddleware, deleteShelter);

export default router;
