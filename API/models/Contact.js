import mongoose from "mongoose";

/**
 * Mongoose schema for the Contact model.
 * Represents contact messages stored in the database.
 */

const ContactSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  statut: {
    type: String,
    enum: ["lu", "non lu", "validé"],
    default: "non lu",
  },
  response: { type: String, default: "" },
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
