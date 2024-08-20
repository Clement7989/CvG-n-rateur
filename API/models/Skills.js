import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  wording: String,
  cv_id: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;
