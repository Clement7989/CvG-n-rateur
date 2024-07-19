import mongoose from "mongoose";

/**
 * Mongoose schema for the Skills model.
 * This schema represents skills associated with a CV.
 */

const SkillsSchema = new mongoose.Schema({
  wording: { type: String, required: true },
  cv_id: {
    type: String, // Définir cv_id comme une chaîne de caractères
    required: true,
  },
});

const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;
