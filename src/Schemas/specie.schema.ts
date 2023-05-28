import Joi from 'joi';

const name = Joi.string();

export const createSpecieSchema = Joi.object({
  name: name.required(),
});
