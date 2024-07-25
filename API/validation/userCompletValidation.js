import Joi from "joi";

// Define the schema for validating userComplet data

export const UserCompletSchema = Joi.object({
  birthday: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  phone: Joi.string().max(10).required(),
});
