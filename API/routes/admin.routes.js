import express from "express";
const router = express.Router();

import { updateUserRole } from "../Controllers/adminController.js";
import {
  getContacts,
  updateContact,
} from "../Controllers/contactController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

// Route to update user role by admin
router.put("/update-role", authMiddleware, adminMiddleware, updateUserRole);

// Route to get all contacts
router.get("/contacts", authMiddleware, adminMiddleware, getContacts);

// Route to update a contact by admin
router.put("/contacts/:id", authMiddleware, adminMiddleware, updateContact);

export default router;
