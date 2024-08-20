import Joi from "joi";

// Define the schema for validating Skills data

export const SkillsSchema = Joi.object({
  wording: Joi.string().min(3).max(30).required(),
});
