// otherInfosController.js

import OtherInfos from "../models/OtherInfos.js";
import { otherInfosSchema } from "../validation/otherInfosValidation.js";

export const createOtherInfo = async (req, res) => {
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages, cv_id } = value;

  try {
    const newOtherInfo = new OtherInfos({ permit, hobbies, languages, cv_id });
    await newOtherInfo.save();
    res.status(201).json(newOtherInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer toutes les autres informations
export const getAllOtherInfos = async (req, res) => {
  try {
    const otherInfos = await OtherInfos.find();
    res.status(200).json(otherInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une autre information par ID
export const getOtherInfoById = async (req, res) => {
  const { id } = req.params;

  try {
    const otherInfo = await OtherInfos.findById(id);
    if (!otherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une autre information
export const updateOtherInfo = async (req, res) => {
  const { id } = req.params;
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages } = value;

  try {
    const updatedOtherInfo = await OtherInfos.findByIdAndUpdate(
      id,
      { permit, hobbies, languages },
      { new: true }
    );
    if (!updatedOtherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json(updatedOtherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une autre information
export const deleteOtherInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOtherInfo = await OtherInfos.findByIdAndDelete(id);
    if (!deletedOtherInfo) {
      return res.status(404).json({ message: "OtherInfo not found" });
    }
    res.status(200).json({ message: "OtherInfo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
