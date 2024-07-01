import Joi from "joi";

// Define the schema for validating CvGenereted data

export const CvGeneretedSchema = Joi.object({
  userId: Joi.string().required(),

  title: Joi.string().required(),

  otherInfos: Joi.string().allow(null),

  professionals: Joi.array().items(Joi.string()),

  skills: Joi.array().items(Joi.string()),

  trainings: Joi.array().items(Joi.string()),

  userDetails: Joi.string().allow(null),
});
