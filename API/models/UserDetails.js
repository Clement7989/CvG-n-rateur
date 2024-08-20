import mongoose from "mongoose";

/**
 * Mongoose schema for the UserDetails model.
 * Represents additional user details stored in the database.
 */

const UserDetailsSchema = new mongoose.Schema({
  address: String,
  zip_code: String,
  country: String,
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

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

export default UserDetails;
