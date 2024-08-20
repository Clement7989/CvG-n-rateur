import express from "express";
import { register, login, logout } from "../Controllers/authController.js";

import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Route to handle user registration
router.post("/register", register);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout
router.post("/logout", authMiddleware, logout);

export default router;
