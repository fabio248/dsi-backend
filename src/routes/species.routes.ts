import { Router } from 'express';
import { asureValidate, checkerRole } from '../middleware/auth.handler';
import { validatorHandler } from '../middleware/validator.handler';
import { createSpecieSchema } from '../Schemas/specie.schema';
import { SpecieService } from '../service/specie.service';
import {
  createSpecie,
  findAllSpecies,
} from '../controllers/species_controller';

export const specieRoute = Router();

specieRoute
  .route('/')
  .get(findAllSpecies)
  .post(validatorHandler(createSpecieSchema, 'body'), createSpecie);
