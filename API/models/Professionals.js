import mongoose from "mongoose";

/**
 * Mongoose schema for the Professionals model.
 * This schema represents professional experiences associated with a CV.
 */

const ProfessionalsSchema = new mongoose.Schema({
  title: String,
  business: String,
  date_start: Date,
  date_end: Date,
  description: String,
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

const Professionals = mongoose.model("Professionals", ProfessionalsSchema);

export default Professionals;
