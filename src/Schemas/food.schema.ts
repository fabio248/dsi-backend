import Joi from 'joi';

const quantity = Joi.string();
const type = Joi.string();

export const createFoodSchema = Joi.object({
  quantity: quantity.required(),
  type: type.required(),
});

export const updateFoodSchema = Joi.object({
  quantity,
  type,
});
