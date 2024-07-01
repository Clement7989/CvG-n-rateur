import Joi from "joi";

// Define the schema for validating user data

export const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
}).unknown(false);

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
