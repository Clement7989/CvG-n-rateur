import express from "express";
const router = express.Router();

import {
  createUserComplet,
  getUserCompletById,
  updateUserComplet,
  deleteUserComplet,
} from "../Controllers/userCompletController.js";

router.post("/", createUserComplet);
router.get("/:id", getUserCompletById);
router.put("/:id", updateUserComplet);
router.delete("/:id", deleteUserComplet);

export default router;
