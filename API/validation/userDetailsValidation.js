import Joi from "joi";

// Define the schema for validating userDetails data

export const UserDetailsSchema = Joi.object({
  address: Joi.string().min(3).max(30).required(),
  zip_code: Joi.string().min(2).max(5).required(),
  country: Joi.string().max(15).required(),

});
