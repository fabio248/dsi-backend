import Joi from 'joi';

const id = Joi.number();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string();
const birthday = Joi.string().pattern(
  new RegExp('^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$')
);

export const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  birthday: birthday.required(),
});

export const updateUserSchema = Joi.object({
  firstName,
  lastName,
  email,
  password,
  birthDay: birthday,
});

export const getUserSchemaById = Joi.object({
  id: id.required(),
});

export const getUserSchemaByEmail = Joi.object({
  email: email.required(),
});
