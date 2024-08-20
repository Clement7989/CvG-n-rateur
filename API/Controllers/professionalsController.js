import Professionals from "../models/Professionals.js";
import { ProfessionalSchema } from "../validation/professionalsValidation.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a new professional entry.
 *
 * @param {Object} req - The request object containing professional details.
 *                       Requires: title, business, date_start, date_end, description, cv_id
 * @param {Object} res - The response object.
 * @returns {Object} - The created professional entry or an error message.
 */

export const createProfessional = async (req, res) => {
  const { error, value } = ProfessionalSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, business, date_start, date_end, description } = value;
  const userId = req.user._id;
  try {
    const cv_id = uuidv4();
    const newProfessional = new Professionals({
      title,
      business,
      date_start,
      date_end,
      description,
      cv_id,
      userId,
    });
    await newProfessional.save();
    res.status(201).json(newProfessional);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all professional entries.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - An array of all professional entries or an error message.
 */

export const getAllProfessionals = async (req, res) => {
  const userId = req.user._id;
  try {
    const professionals = await Professionals.find({ userId });
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a specific professional entry by ID.
 *
 * @param {Object} req - The request object containing the professional ID.
 * @param {Object} res - The response object.
 * @returns {Object} - The professional entry matching the ID or an error message.
 */

export const getProfessionalById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const professional = await Professionals.findOne({ _id: id, userId });
    if (!professional) {
      return res
        .status(404)
        .json({ message: "Catégorie profesionnel non trouvé" });
    }
    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a specific professional entry by ID.
 *
 * @param {Object} req - The request object containing the professional ID and updated details.
 *                       Requires: title, business, date_start, date_end, description, cv_id
 * @param {Object} res - The response object.
 * @returns {Object} - The updated professional entry or an error message.
 */

export const updateProfessional = async (req, res) => {
  const { id } = req.params;
  const { error } = ProfessionalSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const userId = req.user._id;
  const { title, business, date_start, date_end, description, cv_id } =
    req.body;

  try {
    const updateProfessional = await Professionals.findOneAndUpdate(
      { _id: id, userId },
      { title, business, date_start, date_end, description, cv_id },
      { new: true }
    );
    if (!updateProfessional) {
      return res
        .status(404)
        .json({ message: "Catégorie professionel non trouvé" });
    }
    res.status(200).json(updateProfessional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a specific professional entry by ID.
 *
 * @param {Object} req - The request object containing the professional ID.
 * @param {Object} res - The response object.
 * @returns {Object} - A success message or an error message.
 */

export const deleteProfessional = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedProfessional = await Professionals.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedProfessional) {
      return res
        .status(404)
        .json({ message: "Catégorie professionel non trouvé" });
    }
    res
      .status(200)
      .json({ message: "Catégorie professionnel supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
