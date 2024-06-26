import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../Controllers/skillsController.js"; // ajustez le chemin selon l'emplacement réel

const router = express.Router();

// Middleware d'authentification appliqué à toutes les routes de skills

// Routes pour les compétences
router.post("/", createSkill);
router.get("/", getSkills);
router.get("/:id", getSkillById);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
