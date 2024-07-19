import mongoose from "mongoose";

/**
 * Mongoose schema for the UserComplet model.
 * Represents additional user information stored in the database.
 */

const UserCompletSchema = new mongoose.Schema({
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserComplet = mongoose.model("UserComplet", UserCompletSchema);

export default UserComplet;
