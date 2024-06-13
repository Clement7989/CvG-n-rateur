import mongoose from "mongoose";

const CvGeneretedSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CvGenereted = mongoose.models("CvGenereted", CvGeneretedSchema);

export default CvGenereted;
