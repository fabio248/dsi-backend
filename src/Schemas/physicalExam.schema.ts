import Joi from 'joi';

const weight = Joi.number();
const palpitations = Joi.string();

export const createPhysicalExamSchema = Joi.object({
  weight: weight.required(),
  palpitations: palpitations.required(),
});

export const updatePhysicalExamSchema = Joi.object({
  weight,
  palpitations,
});
