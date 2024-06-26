import Professionals from "../models/Professionals.js";
import { ProfessionalSchema } from "../validation/professionalsValidation.js";

export const createProfessional = async (req, res) => {
  const { error } = ProfessionalSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, business, date_start, date_end, description, cv_id } =
    req.body;
  try {
    const newProfessional = new Professionals({
      title,
      business,
      date_start,
      date_end,
      description,
      cv_id,
    });
    await newProfessional.save();
    res.status(201).json(newProfessional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professionals.find();
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfessionalById = async (req, res) => {
  const professionalId = req.params.id;
  try {
    const professional = await Professionals.findById(professionalId);
    if (!professional) {
      return res
        .status(404)
        .json({ message: "Catégorie profesionnel non trouvé" });
    }
    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfessional = async (req, res) => {
  const { error } = ProfessionalSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const professionalId = req.params.id;
  const { title, business, date_start, date_end, description, cv_id } =
    req.body;

  try {
    const updateProfessional = await Professionals.findByIdAndUpdate(
      professionalId,
      { title, business, date_start, date_end, description, cv_id },
      { new: true }
    );
    if (!updateProfessional) {
      return res
        .status(404)
        .json({ message: "Catégorie professionel non trouvé" });
    }
    res.status(200).json(updateProfessional);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfessional = async (req, res) => {
  const professionalId = req.params.id;

  try {
    const deletedProfessional = await Professionals.findByIdAndDelete(
      professionalId
    );
    if (!deletedProfessional) {
      return res
        .status(404)
        .json({ message: "Catégorie professionel non trouvé" });
    }
    res
      .status(200)
      .json({ message: "Catégorie professionnel supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
