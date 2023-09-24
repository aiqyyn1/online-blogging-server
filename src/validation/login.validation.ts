import { Joi } from 'express-validation';

export const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
