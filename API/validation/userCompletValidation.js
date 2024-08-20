import Joi from "joi";

// Define the schema for validating userComplet data

export const UserCompletSchema = Joi.object({
  birthday: Joi.date().required(),
  gender: Joi.string().valid("Homme", "Femme", "Autre").required(),
  phone: Joi.string().max(10).required(),
});
