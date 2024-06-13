import Joi from "joi";

export const SkillsSchema = Joi.object({
  wording: Joi.string().min(10).max(50).required(),
  cv_id: Joi.string().required(),
});
