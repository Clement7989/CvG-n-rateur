import express from "express";
import {
  createOtherInfo,
  getAllOtherInfos,
  getOtherInfoById,
  updateOtherInfo,
  deleteOtherInfo,
} from "../Controllers/otherInfosController.js";

const router = express.Router();

// Creating a new instance of Express Router
router.post("/", createOtherInfo);

// Route to get all "other information" entries
router.get("/", getAllOtherInfos);

// Route to get a specific "other information" entry by ID
router.get("/:id", getOtherInfoById);

// Route to update a specific "other information" entry by ID
router.put("/:id", updateOtherInfo);

// Route to delete a specific "other information" entry by ID
router.delete("/:id", deleteOtherInfo);

export default router;
