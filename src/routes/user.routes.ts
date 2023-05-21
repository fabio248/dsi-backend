import express from 'express';
import {
  registerUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/user_controllers';
import { asureValidate } from '../middleware/auth.handler';
import { validatorHandler } from '../middleware/validator.handler';
import {
  createUserSchema,
  getUserSchemaByEmail,
  getUserSchemaById,
  updateUserSchema,
} from '../Schemas/user.schema';

const userRouter = express.Router();

userRouter.post('/', validatorHandler(createUserSchema, 'body'), registerUser);
userRouter.get(
  '/:id',
  [validatorHandler(getUserSchemaById, 'params'), asureValidate],
  getUser
);
userRouter.get('/', [asureValidate], getAllUsers);
userRouter.delete(
  '/:id',
  [validatorHandler(getUserSchemaById, 'params'), asureValidate],
  deleteUser
);
userRouter.patch(
  '/:id',
  [
    validatorHandler(getUserSchemaById, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    asureValidate,
  ],
  updateUser
);

export { userRouter };
