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
} from "../Controllers/contactController.js";

import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

// Route to create a new contact
router.post("/", createContact);

// Route to fetch all contacts
router.get("/", getContacts);

// Route to fetch a specific contact by ID
router.get("/:id", getContactById);

// Protected routes, accessible only by administrators

// Route to update a contact
router.put("/:id", authMiddleware, adminMiddleware, updateContact);

// Route to delete a contact
router.delete("/:id", authMiddleware, adminMiddleware, deleteContact);

// Route to mark a contact as read
router.put(
  "/:id/mark-read",
  authMiddleware,
  adminMiddleware,
  markContactAsRead
);

// Route to validate a contact
router.put("/:id/validate", authMiddleware, adminMiddleware, validateContact);

export default router;
