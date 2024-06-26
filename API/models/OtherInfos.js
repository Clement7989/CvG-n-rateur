import mongoose from "mongoose";

const OtherInfosSchema = new mongoose.Schema({
  permit: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  languages: { type: [String], required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

// Utilisation de mongoose.model pour créer ou récupérer le modèle OtherInfos
const OtherInfos = mongoose.model("OtherInfos", OtherInfosSchema);

export default OtherInfos;
