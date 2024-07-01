import mongoose from "mongoose";

/**
 * Mongoose schema for the UserDetails model.
 * Represents additional user details stored in the database.
 */

const UserDetailsSchema = new mongoose.Schema({
  address: { type: String, required: true },
  zip_code: { type: String, required: true },
  country: { type: String, required: true },
  cv_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CvGenereted",
    required: true,
  },
});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

export default UserDetails;
