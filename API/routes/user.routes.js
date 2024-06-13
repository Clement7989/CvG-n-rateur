// ASYNC = PERMET DE FAIRE DES PROMESSES COMME AWAIT = ON ATTEND LA PROMESSE
import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
