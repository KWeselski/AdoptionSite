import express from "express";
import {
  createPetAdoption,
  getPet,
  getPets,
} from "../controllers/petAdoptionController.js";

const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPet);
router.post("/add", createPetAdoption);

export default router;
