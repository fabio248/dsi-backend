import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import bcrypt from 'bcryptjs';
import { authService, userService } from '../utils/dependencies/dependencies';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const newEmail = email.toLowerCase();

    const user = await userService.getUserByEmail(newEmail);

    const isMatch: boolean = await bcrypt.compare(password, user.password!);

    if (isMatch) {
      res.status(401).json({ message: 'Incorrect password or email' });
    }

    res.status(200).send({
      accesToken: authService.CreateAccessToken(user),
      refreshToken: authService.RefreshAccessToken(user),
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

    const { token_type, user_id } = authService.decoderToken(token);

    if (token_type !== 'refresh_Token') {
      res.status(500).json({ msg: 'Has been a error, token Invalid' });
    }

    const userExist = await userService.getUserByEmail(user_id);

    if (!userExist) {
      res.status(500).json({ msg: 'Has been a error, token Invalid' });
    }

    res.status(200).json({
      accessToken: authService.CreateAccessToken(user_id),
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
