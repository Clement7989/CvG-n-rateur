import User from "../models/User.js";

export const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    // Vérifiez si l'utilisateur authentifié a le droit de mettre à jour les rôles (peut être redondant avec le middleware adminMiddleware)
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Non autorisé à effectuer cette action" });
    }

    // Mettre à jour le rôle de l'utilisateur avec l'ID spécifié
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
    res.status(500).json({ message: error.message });
  }
};
