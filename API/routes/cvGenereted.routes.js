import express from "express";
import { createCVGenereted } from "../Controllers/cvGeneretedController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
const router = express.Router();

// POST route to create a new generated CV
router.post("/", authMiddleware, createCVGenereted);

export default router;
