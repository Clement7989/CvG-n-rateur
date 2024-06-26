import Joi from "joi";

export const otherInfosSchema = Joi.object({
  permit: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  languages: Joi.array().items(Joi.string()).required(),
  cv_id: Joi.string().required(),
});
