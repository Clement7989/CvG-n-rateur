import express from "express";
import {
  createCVGenereted,
  getCVsByUser,
  updateCV, // Assurez-vous que cette importation est correcte si nécessaire
  deleteCV, // Ajoutez cette importation
} from "../Controllers/cvGeneretedController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
const router = express.Router();

// POST route to create a new generated CV
router.post("/", authMiddleware, createCVGenereted);
// GET route to get CVs by user

router.put("/", authMiddleware, updateCV);
router.get("/", authMiddleware, getCVsByUser);
// DELETE route to delete a CV by ID
router.delete("/:id", authMiddleware, deleteCV); // Ajoutez cette ligne

export default router;
