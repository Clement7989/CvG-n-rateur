import Joi from "joi";

export const OtherInfosSchema = Joi.object({
  permit: Joi.boolean().required(),
  hobbies: Joi.string().min(10).max(30).required(),
  languages: Joi.string().min(5).max(20).required(),
  cv_id: Joi.string().required(),
});
