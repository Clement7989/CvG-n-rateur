import mongoose from "mongoose";

/**
 * Mongoose schema for the Skills model.
 * This schema represents skills associated with a CV.
 */

const SkillsSchema = new mongoose.Schema({
  wording: { type: String, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;
