import UserComplet from "../models/UserComplet.js";
import { UserCompletSchema } from "../validation/userCompletValidation.js";

/**
 * Create a new UserComplet entry.
 *
 * @param {Object} req - HTTP request object containing the user complet data to create.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The created UserComplet entry or an error message.
 */

export const createUserComplet = async (req, res) => {
  const { birthday, gender, phone, user_id } = req.body;
  const { error } = UserCompletSchema.validate({
    birthday,
    gender,
    phone,
    user_id,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const newUserComplet = new UserComplet({
      birthday,
      gender,
      phone,
      user_id,
    });
    await newUserComplet.save();
    res.status(201).json(newUserComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a UserComplet entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the UserComplet ID.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The found UserComplet entry or a not found error message.
 */

export const getUserCompletById = async (req, res) => {
  const { id } = req.params;

  try {
    const userComplet = await UserComplet.findById(id);
    if (!userComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.json(userComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a UserComplet entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the UserComplet ID and updated data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The updated UserComplet entry or a not found error message.
 */

export const updateUserComplet = async (req, res) => {
  const { id } = req.params;
  const { birthday, gender, phone, user_id } = req.body;

  const { error } = UserCompletSchema.validate({
    birthday,
    gender,
    phone,
    user_id,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const updateUserComplet = await UserComplet.findByIdAndUpdate(
      id,
      { birthday, gender, phone, user_id },
      { new: true }
    );
    if (!updateUserComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.json(updateUserComplet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a UserComplet entry by its ID.
 *
 * @param {Object} req - HTTP request object containing the UserComplet ID to delete.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - A success message indicating the UserComplet was deleted successfully or an error message.
 */

export const deleteUserComplet = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUserComplet = await UserComplet.findByIdAndDelete(id);
    if (!deleteUserComplet) {
      return res.status(404).json({ message: "User Complet non trouvée" });
    }
    res.json({ message: "UserComplet supprimée avec succès !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
