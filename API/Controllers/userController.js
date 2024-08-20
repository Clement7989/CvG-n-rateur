import User from "../models/User.js";
import { userSchema } from "../validation/userValidation.js";

/**
 * Get all users.
 *
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @returns {void} - Sends a JSON response containing the list of users or an error message.
 */

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a user by ID.
 *
 * @param {Object} req - HTTP request object containing the user ID parameter.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @param {Object} res - HTTP response object.
 * @returns {void} - Sends a JSON response containing the user object or an error message.
 */

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a user's information.
 *
 * @param {Object} req - HTTP request object containing the user data to update.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The body of the request containing the new user data.
 * @param {string} req.body.firstname - The new first name of the user.
 * @param {string} req.body.lastname - The new last name of the user.
 * @param {string} req.body.email - The new email of the user.
 * @param {string} req.body.password - The new password of the user.
 * @param {Object} res - HTTP response object.
 * @returns {void} - Sends a JSON response containing the updated user object or an error message.
 */

export const updateUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a user by ID.
 *
 * @param {Object} req - HTTP request object containing the user ID parameter.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - HTTP response object.
 * @returns {void} - Sends a JSON response confirming the deletion or an error message.
 */

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
