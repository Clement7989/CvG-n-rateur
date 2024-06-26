import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  console.log("Clé secrete JWT:", process.env.JWT_SECRET);

  // Récupérer le token depuis les headers, cookies ou autres
  const token = req.header("Authorization");

  if (!token) {
    console.log("Token manquant");
    return res.status(401).json({ message: "Authentification requise" });
  }

  try {
    console.log("Token reçu :", token.replace("Bearer ", ""));

    // Vérifier et décoder le token
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    // Trouver l'utilisateur dans la base de données en utilisant l'ID décodé
    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("Utilisateur non trouvé");
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Assigner l'objet utilisateur décodé à la requête pour un accès ultérieur
    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur de vérification du token :", error);

    // Gérer spécifiquement l'erreur TokenExpiredError
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Le jeton a expiré. Veuillez vous reconnecter." });
    }

    // Gérer les autres erreurs de vérification de jeton
    res.status(401).json({ message: "Token invalide" });
  }
};
