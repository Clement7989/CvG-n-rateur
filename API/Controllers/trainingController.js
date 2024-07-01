import Training from "../models/Training.js";
import { TrainingSchema } from "../validation/trainingValidation.js";

/**
 * Create a new training entry.
 *
 * @param {Object} req - HTTP request object containing the training data to create.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The created training entry or an error message.
 */

export const createTraining = async (req, res) => {
  const { diploma, establishment, date_start, date_end, cv_id } = req.body;

  // Valider les données avec Joi
  const { error } = TrainingSchema.validate({
    diploma,
    establishment,
    date_start,
    date_end,
    cv_id,
  });
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

/**
 * Get all training entries.
 *
 * @param {Object} req - HTTP request object (no specific parameters required).
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - An array of all training entries or an error message.
 */

export const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a training entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the training ID.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The found training entry or a not found error message.
 */

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

/**
 * Update a training entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the training ID and updated data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The updated training entry or a not found error message.
 */

export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { diploma, establishment, date_start, date_end, cv_id } = req.body;

  
  const { error } = TrainingSchema.validate({
    diploma,
    establishment,
    date_start,
    date_end,
    cv_id,
  });
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

/**
 * Delete a training entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the training ID to delete.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - A success message indicating the training was deleted successfully or an error message.
 */

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
