import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  wording: { type: String, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const Skills = mongoose.models("Skills", SkillsSchema);

export default Skills;
