import Joi from "joi";

// Define the schema for validating Skills data

export const SkillsSchema = Joi.object({
  wording: Joi.string().min(10).max(50).required(),
  cv_id: Joi.string().required(),
});
