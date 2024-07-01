import mongoose from "mongoose";

/**
 * Mongoose schema for the CvGenereted model.
 * This schema represents a generated CV with references to user and other related information.
 */

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
  userComplet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserComplet",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const CvGenereted = mongoose.model("CvGenereted", CvGeneretedSchema);

export default CvGenereted;
