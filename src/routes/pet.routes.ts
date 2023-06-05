import { Router } from 'express';
import { findAllPets, getPet, updatePet } from '../controllers/pet.controller';
import { validatorHandler } from '../middleware/validator.handler';
import { getPetSchema, updatePetShema } from '../Schemas/pet.schema';

export const petRouter = Router();

petRouter.route('/').get(findAllPets);

petRouter
  .route('/:petId')
  .all(validatorHandler(getPetSchema, 'params'))
  .get(getPet)
  .patch([validatorHandler(updatePetShema, 'body')], updatePet);
