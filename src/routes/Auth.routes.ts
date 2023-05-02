import express from 'express';
import { login } from '../controllers/Auth_controller';

const AuthRouter = express.Router();

AuthRouter.post('/login', login);

export { AuthRouter };
