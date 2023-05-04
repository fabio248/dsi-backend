import express from 'express';
import { registerUser, getUser } from '../controllers/user_controllers';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/getUser', getUser);
userRouter.delete('/deleteUser' /*Anexar funcion*/);
userRouter.patch('/updateUser' /*Anexar funcion*/);

export { userRouter };
