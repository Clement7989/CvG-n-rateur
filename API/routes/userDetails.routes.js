import express from "express";
const router = express.Router();

import {
  createUserDetails,
  getAllUserDetails,
  getUserDetailsById,
  updateUserDetails,
  deleteUserDetails,
} from "../Controllers/userDetailsController.js";

// Route to create user details
router.post("/", createUserDetails);

router.get("/", getAllUserDetails);

// Route to get user details by ID
router.get("/:id", getUserDetailsById);

// Route to update user details by ID
router.put("/:id", updateUserDetails);

// Route to delete user details by ID
router.delete("/:id", deleteUserDetails);

export default router;
