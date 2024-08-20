import OtherInfos from "../models/OtherInfos.js";
import { otherInfosSchema } from "../validation/otherInfosValidation.js";
import { v4 as uuidv4 } from "uuid";

export const createOtherInfo = async (req, res) => {
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages } = value;
  const userId = req.user._id; // Utilisez l'ID de l'utilisateur authentifié

  try {
    // Créez un cv_id unique pour cet utilisateur
    const cv_id = uuidv4();
    const newOtherInfo = new OtherInfos({
      permit,
      hobbies,
      languages,
      cv_id,
      userId,
    });
    await newOtherInfo.save();
    res.status(201).json(newOtherInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOtherInfos = async (req, res) => {
  const userId = req.user._id; // Utilisez l'ID de l'utilisateur authentifié

  try {
    const otherInfos = await OtherInfos.find({ userId });
    res.status(200).json(otherInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOtherInfoById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Utilisez l'ID de l'utilisateur authentifié

  try {
    const otherInfo = await OtherInfos.findOne({ _id: id, userId });
    if (!otherInfo) {
      return res
        .status(404)
        .json({ message: "OtherInfo not found or unauthorized" });
    }
    res.status(200).json(otherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOtherInfo = async (req, res) => {
  const { id } = req.params;
  const { error, value } = otherInfosSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { permit, hobbies, languages } = value;
  const userId = req.user._id; // Utilisez l'ID de l'utilisateur authentifié

  try {
    const updatedOtherInfo = await OtherInfos.findOneAndUpdate(
      { _id: id, userId },
      { permit, hobbies, languages },
      { new: true }
    );
    if (!updatedOtherInfo) {
      return res
        .status(404)
        .json({ message: "OtherInfo not found or unauthorized" });
    }
    res.status(200).json(updatedOtherInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOtherInfo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Utilisez l'ID de l'utilisateur authentifié

  try {
    const deletedOtherInfo = await OtherInfos.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedOtherInfo) {
      return res
        .status(404)
        .json({ message: "OtherInfo not found or unauthorized" });
    }
    res.status(200).json({ message: "OtherInfo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
