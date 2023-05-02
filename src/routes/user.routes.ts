import express from 'express';
import { registerUser } from '../controllers/user_controllers';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

export { userRouter };
