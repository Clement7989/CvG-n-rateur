

import OtherInfos from "../models/OtherInfos.js";
import { otherInfosSchema } from "../validation/otherInfosValidation.js";

/**
 * Create a new other information entry.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created other information or an error message.
 */

export const createOtherInfo = async (req, res) => {
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages, cv_id } = value;

  try {
    const newOtherInfo = new OtherInfos({ permit, hobbies, languages, cv_id });
    await newOtherInfo.save();
    res.status(201).json(newOtherInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all other information entries.
 *

 * @param {Object} res - The response object.
 * @returns {Object} - An array of other information entries or an error message.
 */

export const getAllOtherInfos = async (req, res) => {
  try {
    const otherInfos = await OtherInfos.find();
    res.status(200).json(otherInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a specific other information entry by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The other information entry or an error message.
 */

export const getOtherInfoById = async (req, res) => {
  const { id } = req.params;

  try {
    const otherInfo = await OtherInfos.findById(id);
    if (!otherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a specific other information entry by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated other information entry or an error message.
 */

export const updateOtherInfo = async (req, res) => {
  const { id } = req.params;
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages } = value;

  try {
    const updatedOtherInfo = await OtherInfos.findByIdAndUpdate(
      id,
      { permit, hobbies, languages },
      { new: true }
    );
    if (!updatedOtherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json(updatedOtherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Delete a specific other information entry by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A success message or an error message.
 */

export const deleteOtherInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOtherInfo = await OtherInfos.findByIdAndDelete(id);
    if (!deletedOtherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json({ message: "OtherInfo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
