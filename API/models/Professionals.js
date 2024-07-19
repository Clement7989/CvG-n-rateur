import mongoose from "mongoose";

/**
 * Mongoose schema for the Professionals model.
 * This schema represents professional experiences associated with a CV.
 */

const ProfessionalsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  business: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  description: { type: String, required: true },
  cv_id: {
    type: String,
    required: true,
  },
});

const Professionals = mongoose.model("Professionals", ProfessionalsSchema);

export default Professionals;
