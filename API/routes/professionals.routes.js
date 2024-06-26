import express from "express";
import {
  createProfessional,
  getAllProfessionals,
  getProfessionalById,
  updateProfessional,
  deleteProfessional,
} from "../Controllers/professionalsController.js";

const router = express.Router();

router.post("/", createProfessional);
router.get("/", getAllProfessionals);
router.get("/:id", getProfessionalById);
router.put("/:id", updateProfessional);
router.delete("/:id", deleteProfessional);

export default router;
