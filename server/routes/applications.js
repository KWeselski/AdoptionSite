import express from "express";
import {
  createApplication,
  getApplication,
  getApplications,
  reviewApplication,
} from "../controllers/applicationsController.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplication);
router.put("/:id", reviewApplication);
router.post("/add", createApplication);

export default router;
