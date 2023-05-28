import Joi from 'joi';

const id = Joi.number();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string();
const password = Joi.string();
const birthday = Joi.string()
  .pattern(
    new RegExp(
      '^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$'
    )
  )
  .error(new Error("mal formato de fecha debe ser: 'mm/dd/aaaa'"));
const role = Joi.string().valid('client', 'admin');
const direction = Joi.string();
const dui = Joi.string()
  .min(10)
  .max(10)
  .regex(/^\d{8}-\d$/)
  .error(new Error('mal formato debe ser: 00000000-0'));
const phone = Joi.string().min(8).max(8);

export const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  birthday: birthday.required(),
  role,
  direction,
  dui,
  phone,
});

export const updateUserSchema = Joi.object({
  firstName,
  lastName,
  email,
  password,
  birthday,
  role,
  direction,
  dui,
  phone,
}).min(1);

export const getUserSchemaById = Joi.object({
  id: id.required(),
});

export const getUserSchemaByEmail = Joi.object({
  email: email.required(),
});
