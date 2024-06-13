import Joi from "joi";

export const UserDetailsSchema = Joi.object({
  adress: Joi.string().min(3).max(30).required(),
  zip_code: Joi.string().min(2).max(5).required(),
  country: Joi.string().max(15).required(),
  cv_id: Joi.string().required(),
});
