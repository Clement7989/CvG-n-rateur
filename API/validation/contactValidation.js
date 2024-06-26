import Joi from "joi";

export const contactSchema = Joi.object({
  date: Joi.date().required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(15).max(255).required(),
});
