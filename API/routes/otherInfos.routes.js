import express from "express";
import {
  createOtherInfo,
  getAllOtherInfos,
  getOtherInfoById,
  updateOtherInfo,
  deleteOtherInfo,
} from "../Controllers/otherInfosController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Appliquez le middleware d'authentification à toutes les routes
router.use(authMiddleware);

router.post("/", createOtherInfo);
router.get("/", getAllOtherInfos);
router.get("/:id", getOtherInfoById);
router.put("/:id", updateOtherInfo);
router.delete("/:id", deleteOtherInfo);

export default router;
