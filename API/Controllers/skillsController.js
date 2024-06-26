import Skills from "../models/Skills.js";
import { SkillsSchema } from "../validation/skillsValidation.js";

// Créer une nouvelle compétence
export const createSkill = async (req, res) => {
  const { wording, cv_id } = req.body;

  // Valider les données avec Joi
  const { error } = SkillsSchema.validate({ wording, cv_id });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newSkill = new Skills({ wording, cv_id });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir toutes les compétences
export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir une compétence par son ID
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

// Mettre à jour une compétence par son ID
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { wording, cv_id } = req.body;

  // Valider les données avec Joi
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

// Supprimer une compétence par son ID
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
