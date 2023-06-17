import Joi from 'joi';
import {
  createMedicalHistorySchema,
  updateMedicalHistorySchema,
} from './medicalHistory.schema';

const id = Joi.number();
const name = Joi.string();
const raza = Joi.string();
const color = Joi.string();
const weight = Joi.number().precision(2);
const isHaveTatto = Joi.boolean();
const birthday = Joi.string()
  .pattern(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  .error(new Error("mal formato de fecha debe ser: 'dd/mm/aaaa'"));
const gender = Joi.string().valid('masculino', 'femenino');
const pedigree = Joi.boolean();
const specieId = Joi.number();

export const createPetSchema = Joi.object({
  name: name.required(),
  specie: specieId.required(),
  raza: raza.required(),
  color: color.required(),
  isHaveTatto: isHaveTatto.required(),
  birthday: birthday.required(),
  gender: gender.required(),
  pedigree: pedigree.required(),
});

export const createPetWithMedicalHistorySchema = Joi.object({
  name: name.required(),
  specie: specieId.required(),
  raza: raza.required(),
  color: color.required(),
  isHaveTatto: isHaveTatto.required(),
  birthday: birthday.required(),
  gender: gender.required(),
  pedigree: pedigree.required(),
  medicalHistory: createMedicalHistorySchema.required(),
});

export const updatePetShema = Joi.object({
  name,
  specie: specieId,
  raza,
  color,
  weight,
  isHaveTatto,
  birthday,
  gender,
  pedigree,
  medicalHistory: updateMedicalHistorySchema.min(1),
}).min(1);

export const getPetSchema = Joi.object({
  petId: id.required(),
});
