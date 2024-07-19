import mongoose from "mongoose";

/**
 * Mongoose schema for the Training model.
 * This schema represents training or educational qualifications associated with a CV.
 */

const TrainingSchema = new mongoose.Schema({
  diploma: { type: String, required: true },
  establishment: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  cv_id: {
    type: String,
    required: true,
  },
});

const Training = mongoose.model("Training", TrainingSchema);

export default Training;
