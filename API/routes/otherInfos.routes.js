// otherInfosRoutes.js

import express from "express";
import {
  createOtherInfo,
  getAllOtherInfos,
  getOtherInfoById,
  updateOtherInfo,
  deleteOtherInfo,
} from "../Controllers/otherInfosController.js";

const router = express.Router();

// Créer une nouvelle autre information
router.post("/", createOtherInfo);

// Récupérer toutes les autres informations
router.get("/", getAllOtherInfos);

// Récupérer une autre information par ID
router.get("/:id", getOtherInfoById);

// Mettre à jour une autre information
router.put("/:id", updateOtherInfo);

// Supprimer une autre information
router.delete("/:id", deleteOtherInfo);

export default router;
