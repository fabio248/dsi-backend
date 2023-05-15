import express from 'express';
import { login, refreshToken, sendEmail } from '../controllers/auth_controller';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/refreshToken', refreshToken);
authRouter.post('/forgotPassword', sendEmail);

export { authRouter };
