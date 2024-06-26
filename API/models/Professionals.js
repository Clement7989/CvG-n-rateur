import mongoose from "mongoose";

const ProfessionalsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  business: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  description: { type: String, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const Professionals = mongoose.model("Professionals", ProfessionalsSchema);

export default Professionals;
