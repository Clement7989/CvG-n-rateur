import express from "express";
import {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} from "../Controllers/skillsController.js";

import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Route to create a new skill entry
router.post("/", createSkill);

// Route to get all skill entries
router.get("/", getSkills);

// Route to get a specific skill entry by ID
router.get("/:id", getSkillById);

// Route to update a specific skill entry by ID
router.put("/:id", updateSkill);

// Route to delete a specific skill entry by ID
router.delete("/:id", deleteSkill);

export default router;
