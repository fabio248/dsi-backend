import express from 'express';
import {
  changePassword,
  login,
  refreshToken,
  sendRecoveryMail,
} from '../controllers/auth_controller';
import { validatorHandler } from '../middleware/validator.handler';
import {
  loginSchema,
  refreshTokenSchema,
  sendMailRecoveryPasswordSchema,
  updatePasswordRecoverySchema,
} from '../Schemas/auth.schema';

const authRouter = express.Router();

authRouter.post('/login', validatorHandler(loginSchema, 'body'), login);
authRouter.post(
  '/refreshToken',
  validatorHandler(refreshTokenSchema, 'body'),
  refreshToken
);
authRouter.post(
  '/forgotPassword',
  [validatorHandler(sendMailRecoveryPasswordSchema, 'body')],
  sendRecoveryMail
);
authRouter.post(
  '/change-password',
  validatorHandler(updatePasswordRecoverySchema, 'body'),
  changePassword
);

export { authRouter };
