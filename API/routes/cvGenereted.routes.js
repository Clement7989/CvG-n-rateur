import express from "express";
import { createCVGenereted } from "../Controllers/cvGeneretedController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Route POST pour créer un CV généré
router.post("/", authMiddleware, createCVGenereted);

export default router;
