import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema({
  diploma: { type: String, required: true },
  establishment: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const Training = mongoose.models("Training", TrainingSchema);

export default Training;
