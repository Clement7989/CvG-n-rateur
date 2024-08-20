import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  diploma: String,
  establishment: String,
  date_start: Date,
  date_end: Date,
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

const Training = mongoose.model("Training", trainingSchema);
export default Training;
