import mongoose from "mongoose";

const UserCompletSchema = new mongoose.Schema({
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserComplet = mongoose.model("UserComplet", UserCompletSchema);

export default UserComplet;
