import Joi from "joi";

export const CvGeneretedSchema = Joi.object({
  date: Joi.date().required(),
  time: Joi.string().required(),
  user_id: Joi.string().required(),
});
