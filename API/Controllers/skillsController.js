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
  try {
    const cv_id = uuidv4();
    const newSkill = new Skills({ wording, cv_id });
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
  try {
    const skills = await Skills.find();
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

  try {
    const skill = await Skills.findById(id);
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
  const { wording, cv_id } = req.body;

  const { error } = SkillsSchema.validate({ wording, cv_id });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      { wording, cv_id },
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

  try {
    const deletedSkill = await Skills.findByIdAndDelete(id);
    if (!deletedSkill) {
      return res.status(404).json({ message: "Compétence non trouvée" });
    }
    res.json({ message: "Compétence supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
