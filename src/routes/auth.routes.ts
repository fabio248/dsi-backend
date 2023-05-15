import express from 'express';
import { login, refreshToken } from '../controllers/auth_controller';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/refreshToken', refreshToken);

export { authRouter };
