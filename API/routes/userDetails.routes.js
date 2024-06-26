import express from "express";
const router = express.Router();

import {
  createUserDetails,
  getUserDetailsById,
  updateUserDetails,
  deleteUserDetails,
} from "../Controllers/userDetailsController.js";

router.post("/", createUserDetails);
router.get("/:id", getUserDetailsById);
router.put("/:id", updateUserDetails);
router.delete("/:id", deleteUserDetails);

export default router;
