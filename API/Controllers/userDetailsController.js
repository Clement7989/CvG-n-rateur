import UserDetails from "../models/UserDetails.js";
import { UserDetailsSchema } from "../validation/userDetailsValidation.js";

export const createUserDetails = async (req, res) => {
  const { address, zip_code, city, country, cv_id } = req.body;
  const { error } = UserDetailsSchema.validate({
    address,
    zip_code,
    city,
    country,
    cv_id,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const newUserDetails = new UserDetails({
      address,
      zip_code,
      city,
      country,
      cv_id,
    });
    await newUserDetails.save();
    res.status(201).json(newUserDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { address, zip_code, city, country, cv_id } = req.body;

  const { error } = UserDetailsSchema.validate({
    address,
    zip_code,
    city,
    country,
    cv_id,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedUserDetails = await UserDetails.findByIdAndUpdate(
      id,
      { address, zip_code, city, country, cv_id },
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
