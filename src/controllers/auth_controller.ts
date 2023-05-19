import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import {
  CreateAccessToken,
  RefreshAccessToken,
  decoderToken,
} from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { transporteEmail } from '../utils/mailer';
import { AuthService } from '../service/auth.service';
import boom from 'boom';

const userService = new UserService();
const authService = new AuthService(userService);

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const newEmail = email.toLowerCase();

    const userObtained = await userService.getUserByEmail(newEmail);

    const isMatch: boolean = await bcrypt.compare(
      password,
      userObtained.password
    );

    if (isMatch) {
      res.status(401).json({ message: 'Incorrect password or email' });
    }
    res.status(200).send({
      accesToken: CreateAccessToken(newEmail),
      refreshToken: RefreshAccessToken(newEmail),
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    const { token_type, user_id } = decoderToken(token) as JwtPayload;

    if (token_type !== 'refresh_Token') {
      res.status(500).json({ msg: 'Has been a error, token Invalid' });
    }

    const userExist = await userService.getUserByEmail(user_id);

    if (!userExist) {
      res.status(500).json({ msg: 'Has been a error, token Invalid' });
    }

    res.status(200).json({
      accessToken: CreateAccessToken(user_id),
    });
  } catch (error) {
    next(error);
  }
};

const sendRecoveryMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const rta = await authService.sendRecoveryPassword(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, token } = req.body;
    const rta = await authService.changePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};
export { login, refreshToken, sendRecoveryMail, changePassword };
