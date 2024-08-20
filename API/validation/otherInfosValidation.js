import Joi from "joi";

export const otherInfosSchema = Joi.object({
  permit: Joi.boolean().required(),
  hobbies: Joi.string().min(5).max(100).required(),
  languages: Joi.string().min(5).max(100).required(),
});
