import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Authentification requise" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    next();
  } catch (error) {
    console.error("Erreur de vérification du token :", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Le jeton a expiré. Veuillez vous reconnecter." });
    }

    res.status(401).json({ message: "Token invalide" });
  }
};
