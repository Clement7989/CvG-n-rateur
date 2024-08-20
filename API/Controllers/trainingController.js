import Training from "../models/Training.js";
import { TrainingSchema } from "../validation/trainingValidation.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a new training entry.
 *
 * @param {Object} req - HTTP request object containing the training data to create.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The created training entry or an error message.
 */
export const createTraining = async (req, res) => {
  const { error, value } = TrainingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { diploma, establishment, date_start, date_end } = value;
  const userId = req.user._id;

  try {
    const cv_id = uuidv4();
    const newTraining = new Training({
      diploma,
      establishment,
      date_start,
      date_end,
      cv_id,
      userId,
    });
    await newTraining.save();
    res.status(201).json(newTraining);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  const userId = req.user._id;
  try {
    const trainings = await Training.find({ userId });
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a specific training entry by ID.
 *
 * @param {Object} req - HTTP request object containing the training ID.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The found training entry or a not found error message.
 */
export const getTrainingById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const training = await Training.findById({ _id: id, userId });
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json(training);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a specific training entry by ID.
 *
 * @param {Object} req - HTTP request object containing the training ID and updated data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The updated training entry or a not found error message.
 */
export const updateTraining = async (req, res) => {
  const { id } = req.params;
  const { error, value } = TrainingSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { diploma, establishment, date_start, date_end, cv_id } = value;
  const userId = req.user._id;
  try {
    const updatedTraining = await Training.findByIdAndUpdate(
      { _id: id, userId },
      { diploma, establishment, date_start, date_end, cv_id },
      { new: true }
    );
    if (!updatedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json(updatedTraining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a specific training entry by ID.
 *
 * @param {Object} req - HTTP request object containing the training ID to delete.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - A success message or an error message.
 */
export const deleteTraining = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedTraining = await Training.findByIdAndDelete({
      _id: id,
      userId,
    });
    if (!deletedTraining) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
