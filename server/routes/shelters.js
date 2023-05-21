import express from "express";
import {
  createShelter,
  deleteShelter,
  getShelter,
  getShelters,
  updateShelter,
} from "../controllers/shelterController.js";

const router = express.Router();

router.get("/", getShelters);
router.get("/:id", getShelter);
router.post("/add", createShelter);
router.put("/:id", updateShelter);
router.delete("/:id", deleteShelter);

export default router;
