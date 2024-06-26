import express from "express";
const router = express.Router();

import { updateUserRole } from "../Controllers/adminController.js";
import {
  getContacts,
  updateContact,
} from "../controllers/contactController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

router.put("/update-role", authMiddleware, adminMiddleware, updateUserRole);
router.get("/contacts", authMiddleware, adminMiddleware, getContacts);
router.put("/contacts/:id", authMiddleware, adminMiddleware, updateContact);

export default router;
