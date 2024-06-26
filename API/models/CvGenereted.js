import mongoose from "mongoose";

const CvGeneretedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  otherInfos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OtherInfos",
  },
  professionals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professionals",
    },
  ],
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skills",
    },
  ],
  trainings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
  },
});

const CvGenereted = mongoose.model("CvGenereted", CvGeneretedSchema);

export default CvGenereted;
