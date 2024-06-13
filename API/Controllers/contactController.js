import Contact from "../models/Contact.js";

import { contactSchema } from "../validation/contactValidation.js";

export const createContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { date, email, message, statut } = req.body;
  try {
    const newContact = new Contact({
      date,
      email,
      message,
      statut,
    });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.date = req.body.date;
    contact.email = req.body.email;
    contact.message = req.body.message;
    contact.statut = req.body.statut;

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.remove();
    res.json({ message: "Contact removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
