import Joi from 'joi';

const password = Joi.string();
const token = Joi.string();
const email = Joi.string().email();

export const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const updatePasswordRecoverySchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});

export const sendMailRecoveryPasswordSchema = Joi.object({
  email: email.required(),
});
