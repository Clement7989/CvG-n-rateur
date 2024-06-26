import express from "express";
const router = express.Router();

import {
  createTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} from "../Controllers/trainingController.js";

// Routes pour les formations
router.post("/", createTraining);
router.get("/", getTrainings);
router.get("/:id", getTrainingById);
router.put("/:id", updateTraining);
router.delete("/:id", deleteTraining);

export default router;
