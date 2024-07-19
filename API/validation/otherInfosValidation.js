import Joi from "joi";

export const otherInfosSchema = Joi.object({
  permit: Joi.boolean().required(),
  hobbies: Joi.string().required(), // hobbies doit être une chaîne de caractères
  languages: Joi.string().required(),
});
