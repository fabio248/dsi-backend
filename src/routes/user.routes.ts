import express from 'express';
import {
  registerUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/user_controllers';
import { asureValidate } from '../middleware/UserValidationAuth';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/getUser', [asureValidate], getUser);
userRouter.get('/getAllUser', [asureValidate], getAllUsers);
userRouter.delete('/deleteUser', [asureValidate], deleteUser);
userRouter.patch('/updateUser/:id', [asureValidate], updateUser);

export { userRouter };
