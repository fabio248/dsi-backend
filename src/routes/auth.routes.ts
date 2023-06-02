import express from 'express';
import {
  changePassword,
  login,
  refreshToken,
  sendRecoveryMail,
  saveGoogleData,
} from '../controllers/auth_controller';
import { validatorHandler } from '../middleware/validator.handler';
import {
  loginSchema,
  refreshTokenSchema,
  sendMailRecoveryPasswordSchema,
  updatePasswordRecoverySchema,
} from '../Schemas/auth.schema';
import { checkerRole } from '../middleware/auth.handler';
import { googleUserSchema } from '../Schemas/user.schema';

const authRouter = express.Router();

authRouter.post('/login', validatorHandler(loginSchema, 'body'), login);
authRouter.post('/saveData', saveGoogleData);
authRouter.post(
  '/refreshToken',
  [
    validatorHandler(refreshTokenSchema, 'body'),
    checkerRole('client', 'admin'),
  ],
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
