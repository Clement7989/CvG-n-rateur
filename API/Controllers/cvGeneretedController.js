import CvGenereted from "../models/CvGenereted.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a new generated CV.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created CV or an error message.
 */
export const createCVGenereted = async (req, res) => {
  const { title, trainings, otherInfos, professionals, skills, userDetails } =
    req.body; // Récupérez les données de la requête

  const userId = req.user._id; // ID de l'utilisateur connecté
  const cv_id = uuidv4(); // Générez un nouvel UUID pour cv_id

  try {
    // Trouver l'utilisateur par son ID pour récupérer les informations nécessaires
    const user = await User.findById(userId).select("firstname lastname email");

    // Créer une nouvelle instance de CvGenereted avec les données récupérées
    const newCV = new CvGenereted({
      userId,
      title,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      cv_id,
    });

    // Mapper les IDs des formations et les assigner à newCV.trainings
    if (trainings && trainings.length > 0) {
      const trainingIds = trainings.map((training) => training._id);
      newCV.trainings = trainingIds;
    }

    // Mapper les IDs des professionnels et les assigner à newCV.professionals
    if (professionals && professionals.length > 0) {
      const professionalIds = professionals.map(
        (professional) => professional._id
      );
      newCV.professionals = professionalIds;
    }

    // Mapper les IDs des compétences et les assigner à newCV.skills
    if (skills && skills.length > 0) {
      const skillIds = skills.map((skill) => skill._id);
      newCV.skills = skillIds;
    }

    // Mapper les IDs des autres informations et les assigner à newCV.otherInfos
    if (otherInfos && otherInfos.length > 0) {
      const otherInfoIds = otherInfos.map((otherInfo) => otherInfo._id);
      newCV.otherInfos = otherInfoIds;
    }

    // Assigner les userDetails directement à newCV.userDetails
    if (userDetails && userDetails.length > 0) {
      const userDetailIds = userDetails.map((userDetail) => userDetail._id);
      newCV.userDetails = userDetailIds;
    }

    // Sauvegarder le nouveau CV généré dans la base de données
    await newCV.save();

    // Utiliser populate pour charger les détails complets des formations, professionnels, compétences et autres informations dans newCV
    await newCV.populate(
      "trainings professionals skills otherInfos userDetails"
    );

    // Répondre avec le nouveau CV généré
    res.status(201).json(newCV);
  } catch (error) {
    // En cas d'erreur, répondre avec un statut 500 et un message d'erreur
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all CVs for the currently authenticated user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - List of CVs or an error message.
 */
export const getCVsByUser = async (req, res) => {
  const userId = req.user._id; // ID de l'utilisateur connecté

  try {
    // Trouver tous les CVs associés à l'utilisateur connecté
    const cvs = await CvGenereted.find({ userId }).populate(
      "trainings professionals skills otherInfos userDetails"
    );

    if (cvs.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun CV trouvé pour cet utilisateur" });
    }

    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a generated CV by ID for the currently authenticated user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated CV or an error message.
 */
export const updateCV = async (req, res) => {
  const { id } = req.params; // ID du CV à mettre à jour
  const { title, trainings, otherInfos, professionals, skills, userDetails } =
    req.body; // Données de mise à jour

  const userId = req.user._id; // ID de l'utilisateur connecté

  try {
    // Trouver le CV par son ID
    const cv = await CvGenereted.findById(id);

    if (!cv) {
      return res.status(404).json({ message: "CV non trouvé" });
    }

    // Vérifier que le CV appartient à l'utilisateur connecté
    if (cv.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    // Mettre à jour les informations du CV
    cv.title = title || cv.title;

    // Mettre à jour les IDs des formations, professionnels, compétences et autres informations
    if (trainings) cv.trainings = trainings;
    if (otherInfos) cv.otherInfos = otherInfos;
    if (professionals) cv.professionals = professionals;
    if (skills) cv.skills = skills;
    if (userDetails) cv.userDetails = userDetails;

    // Sauvegarder les modifications
    await cv.save();

    // Répondre avec le CV mis à jour
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a generated CV by ID for the currently authenticated user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A confirmation message or an error message.
 */
export const deleteCV = async (req, res) => {
  const { id } = req.params; // ID du CV à supprimer
  const userId = req.user._id; // ID de l'utilisateur connecté

  try {
    // Trouver et supprimer le CV par son ID
    const cv = await CvGenereted.findOneAndDelete({ _id: id, userId });

    if (!cv) {
      return res.status(404).json({ message: "CV non trouvé" });
    }

    // Répondre avec une confirmation de suppression
    res.json({ message: "CV supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

