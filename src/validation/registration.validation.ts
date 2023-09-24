import { Joi } from 'express-validation';

export const registerValidation = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  re_password: Joi.string().required(),
});
