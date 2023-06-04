import Joi from 'joi';

const id = Joi.number();
const name = Joi.string();
const raza = Joi.string();
const color = Joi.string();
const weight = Joi.number().precision(2);
const isHaveTatto = Joi.boolean();
const birthday = Joi.string().pattern(
  new RegExp('^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$')
);
const gender = Joi.string().valid('masculino', 'femenino');
const pedigree = Joi.boolean();
const idSpecies = Joi.number();

export const createPetSchema = Joi.object({
  name: name.required(),
  species: idSpecies.required(),
  raza: raza.required(),
  color: color.required(),
  weight: weight.required(),
  isHaveTatto: isHaveTatto.required(),
  birthday: birthday.required(),
  gender: gender.required(),
  pedigree: pedigree.required(),
});