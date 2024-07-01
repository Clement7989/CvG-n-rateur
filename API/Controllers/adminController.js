import User from "../models/User.js";

/**
 * Controller function to update user role.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or failure.
 */

export const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
