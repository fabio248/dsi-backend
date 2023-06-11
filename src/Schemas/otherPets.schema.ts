import Joi from 'joi';

const isLiveOtherPets = Joi.boolean();
const whichPets = Joi.string();

export const createOtherPetSchema = Joi.object({
  isLiveOtherPets: isLiveOtherPets.required(),
  whichPets,
});

export const updateOtherPetSchema = Joi.object({
  isLiveOtherPets,
  whichPets,
});
