// controllers/cvGenereted.controller.js

import CvGenereted from "../models/CvGenereted.js";
import OtherInfos from "../models/OtherInfos.js";
import Professionals from "../models/Professionals.js";
import Skills from "../models/Skills.js";
import Training from "../models/Training.js";

export const createCVGenereted = async (req, res) => {
  const { title, cv_id } = req.body;
  const userId = req.user._id; // Utilisation de req.user._id pour l'ID de l'utilisateur

  try {
    // Récupérer les autres informations associées
    const otherInfos = await OtherInfos.findOne({ cv_id });
    const professionals = await Professionals.find({ cv_id });
    const skills = await Skills.find({ cv_id });
    const trainings = await Training.find({ cv_id });

    // Créer un nouveau CvGenereted
    const newCV = new CvGenereted({
      userId,
      title,
      otherInfos: otherInfos ? otherInfos._id : null,
      professionals: professionals.map((pro) => pro._id),
      skills: skills.map((skill) => skill._id),
      trainings: trainings.map((training) => training._id),
      // Autres champs associés si nécessaires
    });

    // Enregistrer le nouveau CV généré
    await newCV.save();

    // Répondre avec le nouveau CV généré
    res.status(201).json(newCV);
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
};
