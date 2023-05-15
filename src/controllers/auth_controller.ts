import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/user.service';
import {
  CreateAccessToken,
  RefreshAccessToken,
  decoderToken,
} from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { transporteEmail } from '../config/mailer';

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

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await transporteEmail.sendMail({
      from: 'Forgot password <veterinariamistum2013@gmail.com>', // sender address
      to: 'jmge5833@gmail.com', // este es el correo del usuario debe variar
      subject: 'Hello, you forgot password ✔', // Subject line
      html: '<b color="blue" >Copie el siguiente código y digitelo en el formulario de la veterinaria: </b><a>INSERT BOT OF CODES HERE</a>', // html body
    });
    res
      .status(200)
      .send({ msg: 'Correo enviado, revise su buzón de entrada en gmail' });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

export { login, refreshToken, sendEmail };
