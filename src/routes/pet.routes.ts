import { Router } from 'express';
import { validatorHandler } from '../middleware/validator.handler';
import { createPetSchema } from '../Schemas/pet.schema';
import { createPet } from '../controllers/pet_controller';

export const petRouter = Router();

petRouter.post('/', [validatorHandler(createPetSchema, 'body')], createPet);
