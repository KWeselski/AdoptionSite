import express from "express";
import {
  createPetAdoption,
  deletePet,
  getPet,
  getPets,
  getPetsManage,
} from "../controllers/petAdoptionController.js";
const router = express.Router();

router.get("/", getPets);
router.get("/manage", getPetsManage);
router.get("/:id", getPet);
router.delete("/:id", deletePet);
router.post("/add", createPetAdoption);

export default router;
