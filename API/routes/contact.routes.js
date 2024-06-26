import express from "express";
const router = express.Router();

import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  markContactAsRead,
  validateContact,
} from "../controllers/contactController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

// Routes accessibles par tous les utilisateurs
router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);

// Routes protégées, accessibles uniquement par les administrateurs
router.put("/:id", authMiddleware, adminMiddleware, updateContact);
router.delete("/:id", authMiddleware, adminMiddleware, deleteContact);
router.put(
  "/:id/mark-read",
  authMiddleware,
  adminMiddleware,
  markContactAsRead
);
router.put("/:id/validate", authMiddleware, adminMiddleware, validateContact);

export default router;
