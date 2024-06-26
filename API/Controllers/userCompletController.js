import UserComplet from "../models/UserComplet.js";
import { UserCompletSchema } from "../validation/userCompletValidation.js";

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
