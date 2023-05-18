import express from "express";
import {
  createApplication,
  getApplication,
  getApplications,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplication);
router.post("/add", createApplication);

export default router;
