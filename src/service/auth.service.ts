import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import boom from 'boom';
import bcrypt from 'bcryptjs';
import { config, configJwt } from '../config';
import { UserService } from './user.service';
import { mailBody } from '../utils/types/mailer';

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async sendMail(infoEmail: mailBody) {
    let transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: +config.smtpPort,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoEmail);

    return { message: 'mail sent' };
  }

  async changePassword(token: string, newPassword: string) {
    const payload = jwt.verify(token, configJwt.jwt_secret_key);
    const user = await this.userService.getUserById(payload.sub.toString());
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(user.id, {
      password: hash,
      recoveryToken: null,
    });
    return { message: 'Password changed' };
  }
  async sendRecoveryPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, configJwt.jwt_secret_key, {
      expiresIn: '15m',
    });
    const link = `${config.urlFront}/cambiar-contraseña?token=${token}`;
    await this.userService.updateUser(user.id, { recoveryToken: token });

    const mail = {
      from: `${config.smtpEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para cambio de contraseña', // Subject line
      html: `<p>Hola,</p>
            <p>Este correo es para cambiar tu contraseña.</p>
            <b>Ingresa a este link para cambiar la contraseña => ${link} </b>
            <p>Este link expira en 15 minutos</p>
            <p>El equipo de Veterinaria Mitsun.</p>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }
}
