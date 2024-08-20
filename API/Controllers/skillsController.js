import Skills from "../models/Skills.js";
import { SkillsSchema } from "../validation/skillsValidation.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create a new skill.
 *
 * @param {Object} req - HTTP request object containing the skill data to create.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The created skill or an error message.
 */
export const createSkill = async (req, res) => {
  const { error, value } = SkillsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { wording } = value;
  const userId = req.user._id;
  try {
    const cv_id = uuidv4(); // Generate a unique ID
    const newSkill = new Skills({ wording, cv_id, userId });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all skills.
 *
 * @param {Object} req - HTTP request object (no specific parameters required).
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - An array of all skills or an error message.
 */
export const getSkills = async (req, res) => {
  const userId = req.user._id;
  try {
    const skills = await Skills.find({ userId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a skill by its ID.
 *
 * @param {Object} req - HTTP request object containing the skill ID.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The found skill or a not found error message.
 */
export const getSkillById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const skill = await Skills.findById({ _id: id, userId });
    if (!skill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a skill by its ID.
 *
 * @param {Object} req - HTTP request object containing the skill ID and updated data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The updated skill or a not found error message.
 */
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { error, value } = SkillsSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { wording } = value;
  const userId = req.user._id;

  // Validate the request body

  try {
    const updatedSkill = await Skills.findByIdAndUpdate(
      { _id: id, userId },
      { wording }, // Do not include cv_id here
      { new: true }
    );
    if (!updatedSkill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a skill by its ID.
 *
 * @param {Object} req - HTTP request object containing the skill ID to delete.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - A success message indicating the skill was deleted successfully or an error message.
 */
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedSkill = await Skills.findByIdAndDelete({
      _id: id,
      userId,
    });
    if (!deletedSkill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.json({ message: "Compétence supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
