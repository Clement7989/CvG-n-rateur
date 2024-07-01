import express from "express";
const router = express.Router();

import {
  createTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} from "../Controllers/trainingController.js";

// Route to create a new training entry
router.post("/", createTraining);

// Route to get all training entries
router.get("/", getTrainings);

// Route to get a specific training entry by ID
router.get("/:id", getTrainingById);

// Route to update a specific training entry by ID
router.put("/:id", updateTraining);

// Route to delete a specific training entry by ID
router.delete("/:id", deleteTraining);

export default router;
