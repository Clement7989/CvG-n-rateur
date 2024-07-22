import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  wording: { type: String, required: true },
  cv_id: {
    type: String,
    required: true,
  },
});

const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;
