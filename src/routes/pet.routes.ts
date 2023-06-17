import { Router } from 'express';
import {
  findAllPets,
  getPet,
  updatePet,
  createFile,
  deletePet,
} from '../controllers/pet.controller';
import { validatorHandler } from '../middleware/validator.handler';
import { getPetSchema, updatePetShema } from '../Schemas/pet.schema';
import { filesPayloadExists } from '../middleware/filesPayloadExits';
import { fileExtLimiter } from '../middleware/fileExtLimiter';
import { fileSizeLimiter } from '../middleware/fileSizeLimiter';
import multer from 'multer';

export const petRouter = Router();
const upload = multer();

petRouter.route('/').get(findAllPets);

petRouter
  .route('/:petId')
  .all(validatorHandler(getPetSchema, 'params'))
  .get(getPet)
  .patch([validatorHandler(updatePetShema, 'body')], updatePet)
  .post(
    [
      upload.single('exam'),
      filesPayloadExists, // Custom middlewapfre to check if files exist in request payload
      fileExtLimiter(['png', 'jpg', 'jpeg', 'pdf']), // Custom middleware to check allowed file extensions
      fileSizeLimiter, // Custom middleware to check file size limit
    ],
    createFile
  )
  .delete(deletePet);
