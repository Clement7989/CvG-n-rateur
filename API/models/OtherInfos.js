import mongoose from "mongoose";

/**
 * Mongoose schema for the OtherInfos model.
 * Represents additional information related to a generated CV.
 */

const OtherInfosSchema = new mongoose.Schema({
  permit: { type: Boolean, required: true },
  hobbies: { type: String, required: true },
  languages: { type: String, required: true },
  cv_id: {
    type: String, // Définir cv_id comme une chaîne de caractères
    required: true,
  },
});

const OtherInfos = mongoose.model("OtherInfos", OtherInfosSchema);

export default OtherInfos;
