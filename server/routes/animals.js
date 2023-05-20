import express from "express";
import {
  createPetAdoption,
  deletePet,
  getPet,
  getPets,
  getPetsManage,
} from "../controllers/petAdoptionController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getPets);
router.get("/manage", getPetsManage);
router.get("/:id", getPet);
router.delete("/:id", deletePet);
router.post("/add", upload.single("image"), createPetAdoption);

export default router;
