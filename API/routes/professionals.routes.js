import express from "express";
import {
  createProfessional,
  getAllProfessionals,
  getProfessionalById,
  updateProfessional,
  deleteProfessional,
} from "../Controllers/professionalsController.js";

const router = express.Router();

// Route to create a new professional entry
router.post("/", createProfessional);

// Route to get all professional entries
router.get("/", getAllProfessionals);

// Route to get a specific professional entry by ID
router.get("/:id", getProfessionalById);

// Route to update a specific professional entry by ID
router.put("/:id", updateProfessional);

// Route to delete a specific professional entry by ID
router.delete("/:id", deleteProfessional);

export default router;
