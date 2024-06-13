import mongoose from "mongoose";

const OtherInfosSchema = new mongoose.Schema({
  permit: { type: Boolean, required: true },
  hobbies: { type: String, required: true },
  languages: { type: String, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const Otherinfos = mongoose.models("OtherInfos", OtherInfosSchema);

export default Otherinfos;
