// api.routes.js
import express from "express";
const router = express.Router();

// Route GET à l'endpoint "/"
router.get("/", (req, res) => {
  res.json({ message: "Route API fonctionne correctement" });
});

export default router;
