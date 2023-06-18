import Joi from 'joi';
import { createFoodSchema, updateFoodSchema } from './food.schema';
import {
  createPhysicalExamSchema,
  updatePhysicalExamSchema,
} from './physicalExam.schema';
import { createOtherPetSchema, updateOtherPetSchema } from './otherPets.schema';

const isHaveAllVaccine = Joi.boolean();
const isReproduced = Joi.boolean();
const descendants = Joi.string();
const room = Joi.string();
const diasesEvaluation = Joi.string();
const observation = Joi.string();

export const createMedicalHistorySchema = Joi.object({
  isHaveAllVaccine: isHaveAllVaccine.required(),
  isReproduced: isReproduced.required(),
  descendants: descendants.required(),
  room: room.required(),
  diasesEvaluation: diasesEvaluation.required(),
  observation: observation.required(),
  food: createFoodSchema.required(),
  physicalExam: createPhysicalExamSchema.required(),
  otherPet: createOtherPetSchema,
});

export const updateMedicalHistorySchema = Joi.object({
  isHaveAllVaccine,
  isReproduced,
  descendants,
  room,
  diasesEvaluation,
  observation,
  food: updateFoodSchema,
  physicalExam: updatePhysicalExamSchema,
  otherPet: updateOtherPetSchema,
});
