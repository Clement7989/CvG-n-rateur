import UserDetails from "../models/UserDetails.js";
import { UserDetailsSchema } from "../validation/userDetailsValidation.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create new user details.
 *
 * @param {Object} req - HTTP request object containing the user details data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The created UserDetails entry or an error message.
 */
export const createUserDetails = async (req, res) => {
  const { error, value } = UserDetailsSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { address, zip_code, country } = value;

  try {
    const cv_id = uuidv4();
    const newUserDetails = new UserDetails({
      address,
      zip_code,
      country,
      cv_id,
    });
    await newUserDetails.save();
    res.status(201).json(newUserDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user details by ID.
 *
 * @param {Object} req - HTTP request object containing the UserDetails ID.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The found UserDetails entry or a not found error message.
 */

export const getUserDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const userDetails = await UserDetails.findById(id);
    if (!userDetails) {
      return res.status(404).json({ message: "User Details not found" });
    }
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update user details by ID.
 *
 * @param {Object} req - HTTP request object containing the UserDetails ID and updated data.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - The updated UserDetails entry or a not found error message.
 */

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { address, zip_code, city, country, cv_id } = req.body;

  const { error } = UserDetailsSchema.validate({
    address,
    zip_code,

    country,
    cv_id,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedUserDetails = await UserDetails.findByIdAndUpdate(
      id,
      { address, zip_code, country, cv_id },
      { new: true }
    );
    if (!updatedUserDetails) {
      return res.status(404).json({ message: "User Details not found" });
    }
    res.json(updatedUserDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete user details by ID.
 *
 * @param {Object} req - HTTP request object containing the UserDetails ID to delete.
 * @param {Object} res - HTTP response object returned to the client.
 * @returns {Object} - A success message indicating the UserDetails was deleted successfully or an error message.
 */

export const deleteUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUserDetails = await UserDetails.findByIdAndDelete(id);
    if (!deletedUserDetails) {
      return res.status(404).json({ message: "User Details not found" });
    }
    res.json({ message: "User Details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
