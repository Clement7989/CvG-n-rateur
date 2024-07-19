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

  const userId = req.user._id;
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
    if (userDetails) {
      newCV.userDetails = userDetails._id;
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
