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
    type: String, // Définir cv_id comme une chaîne de caractères
    required: true,
  },
});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

export default UserDetails;
