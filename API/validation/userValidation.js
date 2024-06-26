import Joi from "joi";


// Schéma de validation avec Joi pour l'inscription des utilisateurs
export const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
