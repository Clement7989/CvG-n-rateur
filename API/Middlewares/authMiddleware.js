import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to authenticate users using JWT.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} req.header - The headers of the request.
 * @param {string} req.header.Authorization - The authorization header containing the JWT token.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - The next middleware function to be called.
 */

export const authMiddleware = async (req, res, next) => {
  console.log("Clé secrete JWT:", process.env.JWT_SECRET);

  const token = req.header("Authorization");

  if (!token) {
    console.log("Token manquant");
    return res.status(401).json({ message: "Authentification requise" });
  }

  try {
    console.log("Token reçu :", token.replace("Bearer ", ""));

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("Utilisateur non trouvé");
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    req.user = user;
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
