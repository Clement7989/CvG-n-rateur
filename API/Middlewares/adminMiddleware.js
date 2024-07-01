import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to check if the user is authenticated and has the 'admin' role.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} req.body - The request payload containing user details.
 * @param {string} req.body.userId - The ID of the user making the request.
 * @param {string} req.body.newRole - The new role to be assigned.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - The next middleware function to be called.
 */

export const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé - Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès interdit - Rôle insuffisant" });
    }
    const { userId, newRole } = req.body;
    if (userId === decoded.id && newRole === "admin") {
      return res.status(403).json({
        message: "Vous ne pouvez pas vous attribuer le rôle 'admin' vous-même",
      });
    }

    next();
  } catch (error) {
    console.error("Erreur de vérification du token JWT :", error);
    return res
      .status(401)
      .json({ message: "Accès non autorisé - Token invalide" });
  }
};
