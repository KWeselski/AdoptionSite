import express from 'express';
import {
  createPetAdoption,
  deletePet,
  getPet,
  getPets,
  getPetsManage,
} from '../controllers/petAdoptionController.js';

import { adminAuthMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPets);
router.get('/manage', adminAuthMiddleware, getPetsManage);
router.get('/:id', getPet);
router.delete('/:id', adminAuthMiddleware, deletePet);
router.post('/add', adminAuthMiddleware, createPetAdoption);

export default router;
