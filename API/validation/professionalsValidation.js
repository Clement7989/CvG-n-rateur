import Joi from "joi";

// Define the schema for validating Professional data

export const ProfessionalSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),

  business: Joi.string().min(5).max(20).required(),

  date_start: Joi.date().required(),

  date_end: Joi.date().required(),

  description: Joi.string().min(10).max(50).required(),
});
