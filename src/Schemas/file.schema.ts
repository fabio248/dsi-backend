import Joi from 'joi';

const file = Joi.object();

export const createFileSchema = Joi.object({
  file: file.required(),
});
