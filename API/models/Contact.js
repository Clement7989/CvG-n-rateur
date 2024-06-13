import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
});

const Contact = mongoose.models("Contact", ContactSchema);

export default Contact;
