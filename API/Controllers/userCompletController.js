import UserComplet from "../models/UserComplet.js";
import { UserCompletSchema } from "../validation/userCompletValidation.js";

/**
 * Crée une nouvelle entrée UserComplet.
 *
 * @param {Object} req - Objet de requête HTTP contenant les données UserComplet à créer.
 * @param {Object} res - Objet de réponse HTTP retourné au client.
 * @returns {Object} - L'entrée UserComplet créée ou un message d'erreur.
 */
export const createUserComplet = async (req, res) => {
  const { error, value } = UserCompletSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { birthday, gender, phone } = value;
  const userId = req.user._id; // Utiliser l'ObjectId de l'utilisateur connecté

  try {
    const newUserComplet = new UserComplet({
      birthday,
      gender,
      phone,
      userId,
    });
    await newUserComplet.save();
    res.status(201).json(newUserComplet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Récupère toutes les entrées UserComplet pour l'utilisateur connecté.
 *
 * @param {Object} req - Objet de requête HTTP.
 * @param {Object} res - Objet de réponse HTTP retourné au client.
 * @returns {Object} - Liste des entrées UserComplet ou un message d'erreur.
 */
export const getUserComplet = async (req, res) => {
  const userId = req.user._id;
  try {
    const userComplet = await UserComplet.find({ userId });
    res.status(200).json(userComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Récupère une entrée UserComplet spécifique par son ID.
 *
 * @param {Object} req - Objet de requête HTTP contenant l'ID de UserComplet.
 * @param {Object} res - Objet de réponse HTTP retourné au client.
 * @returns {Object} - L'entrée UserComplet trouvée ou un message d'erreur.
 */
export const getUserCompletById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const userComplet = await UserComplet.findOne({ _id: id, userId });
    if (!userComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.json(userComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Met à jour une entrée UserComplet spécifique par son ID.
 *
 * @param {Object} req - Objet de requête HTTP contenant l'ID de UserComplet et les données mises à jour.
 * @param {Object} res - Objet de réponse HTTP retourné au client.
 * @returns {Object} - L'entrée UserComplet mise à jour ou un message d'erreur.
 */
export const updateUserComplet = async (req, res) => {
  const { id } = req.params;
  const { error, value } = UserCompletSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { birthday, gender, phone } = value;
  const userId = req.user._id;

  try {
    const updatedUserComplet = await UserComplet.findOneAndUpdate(
      { _id: id, userId },
      { birthday, gender, phone },
      { new: true }
    );
    if (!updatedUserComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.status(200).json(updatedUserComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Supprime une entrée UserComplet spécifique par son ID.
 *
 * @param {Object} req - Objet de requête HTTP contenant l'ID de UserComplet à supprimer.
 * @param {Object} res - Objet de réponse HTTP retourné au client.
 * @returns {Object} - Un message de succès indiquant que l'entrée UserComplet a été supprimée ou un message d'erreur.
 */
export const deleteUserComplet = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deleteUserComplet = await UserComplet.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deleteUserComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.json({ message: "UserComplet supprimée avec succès !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
