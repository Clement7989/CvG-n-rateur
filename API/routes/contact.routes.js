import express from "express";

import {
  createContact,
  getContact,
  getContactById,
  updateContact,
  deleteContact,
} from "../Controllers/contactController.js";
import { protect } from "../Controllers/authController.js";

const router = express.Router();

router.post("/", protect, createContact);
router.get("/", protect, getContact);
router.get("/:id", protect, getContactById);
router.put("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

export default router;
