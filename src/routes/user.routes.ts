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
} from '../Schemas/user.schema';

const userRouter = express.Router();

userRouter.post('/', validatorHandler(createUserSchema, 'body'), registerUser);
userRouter.get(
  '/:email',
  validatorHandler(getUserSchemaByEmail, 'params'),
  [asureValidate],
  getUser
);
userRouter.get(
  '/',
  [asureValidate],
  validatorHandler(getUserSchemaByEmail, 'params'),
  getAllUsers
);
userRouter.delete(
  '/:email',
  validatorHandler(getUserSchemaByEmail, 'params'),
  [asureValidate],
  deleteUser
);
userRouter.patch(
  '/:id',
  validatorHandler(getUserSchemaById, 'params'),
  [asureValidate],
  updateUser
);

export { userRouter };
