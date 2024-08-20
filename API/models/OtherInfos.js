import mongoose from "mongoose";

const otherInfosSchema = new mongoose.Schema({
  permit: Boolean,
  hobbies: String,
  languages: String,
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

const OtherInfos = mongoose.model("OtherInfos", otherInfosSchema);
export default OtherInfos;
