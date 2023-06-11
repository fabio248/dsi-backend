import Joi from 'joi';
import {
  createPetSchema,
  createPetWithMedicalHistorySchema,
} from './pet.schema';

const id = Joi.number();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string();
const password = Joi.string();
const birthday = Joi.string()
  .pattern(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  .error(new Error("mal formato de fecha debe ser: 'dd/mm/aaaa'"));
const role = Joi.string().valid('client', 'admin');
const direction = Joi.string();
const dui = Joi.string()
  .min(10)
  .max(10)
  .regex(/^\d{8}-\d$/)
  .error(new Error('mal formato debe ser: 00000000-0'));
const phone = Joi.string().min(9).max(9);

export const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  birthday,
  role,
  direction,
  dui,
  phone,
});

export const createUserWithPetSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  birthday,
  role,
  direction,
  dui,
  phone,
  pet: createPetWithMedicalHistorySchema.required(),
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

//temporal schema
export const googleUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password,
  birthday,
  role,
  phone,
});

export const getUserSchemaById = Joi.object({
  userId: id.required(),
});

export const getUserSchemaByEmail = Joi.object({
  email: email.required(),
});

export const sendEmailCalendarConfirmation = Joi.object({
  email: email.required(),
});
