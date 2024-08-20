import mongoose from "mongoose";

/**
 * Mongoose schema for the UserComplet model.
 * Represents additional user information stored in the database.
 */

const UserCompletSchema = new mongoose.Schema({
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserComplet = mongoose.model("UserComplet", UserCompletSchema);

export default UserComplet;
