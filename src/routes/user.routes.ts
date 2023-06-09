import express from 'express';
import {
  registerUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser,
  sendEmailCalendar,
  createUserWithPet,
} from '../controllers/user.controllers';
import { asureValidate, checkerRole } from '../middleware/auth.handler';
import { validatorHandler } from '../middleware/validator.handler';
import {
  createUserSchema,
  getUserSchemaById,
  updateUserSchema,
  sendEmailCalendarConfirmation,
  createUserWithPetSchema,
} from '../Schemas/user.schema';
import { createPetSchema } from '../Schemas/pet.schema';
import { createPet } from '../controllers/pet.controller';

const userRouter = express.Router();

userRouter.post('/', validatorHandler(createUserSchema, 'body'), registerUser);

userRouter.post(
  '/pets',
  [
    asureValidate,
    checkerRole('client', 'admin'),
    validatorHandler(createUserWithPetSchema, 'body'),
  ],
  createUserWithPet
);

userRouter.post(
  '/sendEmail',
  validatorHandler(sendEmailCalendarConfirmation, 'body'),
  asureValidate,
  sendEmailCalendar
);

userRouter.post(
  '/:userId/pets',
  validatorHandler(getUserSchemaById, 'params'),
  validatorHandler(createPetSchema, 'body'),
  asureValidate,
  checkerRole('admin'),
  createPet
);

userRouter.get(
  '/:userId',
  [
    validatorHandler(getUserSchemaById, 'params'),
    asureValidate,
    checkerRole('client', 'admin'),
  ],
  getUser
);

userRouter.get(
  '/',
  [asureValidate, checkerRole('client', 'admin')],
  getAllUsers
);

userRouter.delete(
  '/:userId',
  [
    validatorHandler(getUserSchemaById, 'params'),
    asureValidate,
    checkerRole('client', 'admin'),
  ],
  deleteUser
);

userRouter.patch(
  '/:userId',
  [
    validatorHandler(getUserSchemaById, 'params'),
    // validatorHandler(updateUserSchema, 'body'),
    asureValidate,
    checkerRole('client', 'admin'),
  ],
  updateUser
);

export { userRouter };
