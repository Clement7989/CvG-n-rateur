import Contact from "../models/Contact.js";
import { contactSchema } from "../validation/contactValidation.js";

/**
 * Create a new contact.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created contact or an error message.
 */

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

/**
 * Retrieve all contacts.
 *
 * @param {Object} res - The response object.
 * @returns {Array} - List of all contacts or an error message.
 */

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieve a contact by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The contact object or an error message.
 */

// Obtenir un contact par son ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update a contact.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated contact or an error message.
 */

export const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.date = req.body.date;
    contact.email = req.body.email;
    contact.message = req.body.message;

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete a contact.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A success message or an error message.
 */

export const deleteContact = async (req, res) => {
  try {
    // Supprimer le contact en utilisant findByIdAndDelete
    const contact = await Contact.findByIdAndDelete(req.params.id);

    // Vérifier si le contact a été trouvé et supprimé
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Répondre avec un message de succès
    res.json({ message: "Contact removed" });
  } catch (err) {
    // Gérer les erreurs
    res.status(500).json({ message: err.message });
  }
};

/**
 * Mark a contact as read.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated contact or an error message.
 */

export const markContactAsRead = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.statut = "lu";

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const respondToContact = async (req, res) => {
  const { response } = req.body; // Assurez-vous de passer la réponse dans le corps de la requête

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.response = response; // Met à jour le champ de réponse
    await contact.save();

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Validate a contact (example: mark as validated).
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated contact or an error message.
 */

export const validateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    contact.statut = "validé";

    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
