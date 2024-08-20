import Joi from "joi";

// Define the schema for validating Training data

export const TrainingSchema = Joi.object({
  diploma: Joi.string().min(5).max(25).required(),
  establishment: Joi.string().min(5).max(15).required(),
  date_start: Joi.date().required(),
  date_end: Joi.date().required(),
  date_end: Joi.date().iso().greater(Joi.ref('date_start')).required(),
  
});
