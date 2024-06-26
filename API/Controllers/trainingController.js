import Training from "../models/Training.js";
import { TrainingSchema } from "../validation/trainingValidation.js";

// Créer une nouvelle formation
export const createTraining = async (req, res) => {
  const { diploma, establishment, date_start, date_end, cv_id } = req.body;

  // Valider les données avec Joi
  const { error } = TrainingSchema.validate({ diploma, establishment, date_start, date_end, cv_id });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newTraining = new Training({
      diploma,
      establishment,
      date_start,
      date_end,
      cv_id,
    });

    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les formations
export const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une formation par son ID
export const getTrainingById = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une formation
export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { diploma, establishment, date_start, date_end, cv_id } = req.body;

  // Valider les données avec Joi
  const { error } = TrainingSchema.validate({ diploma, establishment, date_start, date_end, cv_id });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedTraining = await Training.findByIdAndUpdate(
      id,
      { diploma, establishment, date_start, date_end, cv_id },
      { new: true }
    );

    if (!updatedTraining) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }

    res.json(updatedTraining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une formation
export const deleteTraining = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTraining = await Training.findByIdAndDelete(id);
    if (!deletedTraining) {
      return res.status(404).json({ message: "Formation non trouvée" });
    }
    res.json({ message: "Formation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
