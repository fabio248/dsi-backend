import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import {
  CreateAccessToken,
  RefreshAccessToken,
  decoderToken,
} from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userService = new UserService();

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const newEmail = email.toLowerCase();

    const userObtained = await userService.getUser(newEmail);

    const test = bcrypt.decodeBase64(userObtained.password, 10);

    bcrypt.compare(
      password,
      userObtained.password,
      (bcryptError: any, cheack) => {
        if (bcryptError) {
          res
            .status(500)
            .send({ msg: 'Error of the server, please try again!' });
        } else if (!cheack) {
          res
            .status(500)
            .send({ msg: 'Error of the server, please try again!' });
        } else {
          res.status(201).send({
            accesToken: CreateAccessToken(newEmail),
            refreshToken: RefreshAccessToken(newEmail),
          });
        }
      }
    );
  } catch (error) {
    res.status(400).send('Has been a error, please try again');
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

    if (token_type == 'refresh_Token') {
      const userExist = await userService.getUser(user_id);
      if (userExist != null) {
        res.status(200).send({
          accessToken: CreateAccessToken(user_id),
        });
      }
    } else {
      res.status(400).send({ msg: 'Has been a error, token Invalid' });
    }
  } catch (error) {
    res.status(400).send({ msg: 'Has been a error, token Invalid!' });
    next(error);
  }
};

export { login, refreshToken };
