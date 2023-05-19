import express from "express";
import {
  createPetAdoption,
  getPet,
  getPets,
} from "../controllers/petAdoptionController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPet);
router.post("/add", upload.single("image"), createPetAdoption);

export default router;
