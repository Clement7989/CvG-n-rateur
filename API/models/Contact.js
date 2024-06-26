import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  statut: {
    type: String,
    enum: ["lu", "non lu", "validé"],
    default: "non lu",
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
