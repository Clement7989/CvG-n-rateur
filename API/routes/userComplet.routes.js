import express from "express";
const router = express.Router();

import {
  createUserComplet,
  getUserCompletById,
  getUserComplet,
  updateUserComplet,
  deleteUserComplet,
} from "../Controllers/userCompletController.js";

// Route to create a new user completion entry
router.post("/", createUserComplet);

router.get("/", getUserComplet);
// Route to get a user completion entry by ID
router.get("/:id", getUserCompletById);

// Route to update a user completion entry by ID
router.put("/:id", updateUserComplet);

// Route to delete a user completion entry by ID
router.delete("/:id", deleteUserComplet);

export default router;
