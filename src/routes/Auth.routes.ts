import express from 'express';
import { login, refreshToken } from '../controllers/Auth_controller';

const AuthRouter = express.Router();

AuthRouter.post('/login', login);
AuthRouter.post('/refreshToken', refreshToken);

export { AuthRouter };
