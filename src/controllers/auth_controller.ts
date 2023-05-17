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

    const isMatch: boolean = await bcrypt.compare(
      password,
      userObtained.password
    );

    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect password or email' });
    }
    res.status(200).send({
      accesToken: CreateAccessToken(newEmail),
      refreshToken: RefreshAccessToken(newEmail),
    });
  } catch (error) {
    res.status(500).send('Has been a error, please try again');
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

    const userExist = await userService.getUser(user_id);

    if (!userExist) {
      res.status(500).json({ msg: 'Has been a error, token Invalid' });
    }

    res.status(200).json({
      accessToken: CreateAccessToken(user_id),
    });
  } catch (error) {
    res.status(400).send({ msg: 'Has been a error, token Invalid!' });
    next(error);
  }
};

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    await transporteEmail.sendMail({
      from: 'forgot password <veterinariamistum2013@gmail.com>', // sender address
      to: 'fabioflores021@gmail.com', // este es el correo del usuario debe variar
      subject:
        'Hola, este es un correo que te brindará un código de verificación', // Subject line
      html: '<b color="blue" text_align="center" >Copie el siguiente código y digitelo en el formulario de la veterinaria: </b><a>INSERT BOT OF CODES HERE</a>', // html body
    });
    res.status(200).send({
      msg: 'Correo enviado, revise su buzón de entrada en gmail',
      enviado: 'claudiamariaa2c@gmail.com',
    });
  } catch (error) {
    res.status(500).send('Has been a error, please try again!');
    next(error);
  }
};

export { login, refreshToken, sendEmail };
