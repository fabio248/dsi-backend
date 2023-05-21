import nodemailer from 'nodemailer';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import boom from 'boom';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { UserService } from './user.service';
import { mailBody } from '../utils/types/mailer';
import { userEntry } from '../utils/types/user';
import { jwtTokenType } from '../utils/types/generic';

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async sendMail(infoEmail: mailBody) {
    let transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: +config.smtpPort!,
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
    const payload = jwt.verify(token, config.jwt_secret_key);
    const user = await this.userService.getUserById(+payload.sub);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await this.userService.updateUser(user.id, {
      password: hash,
      recoveryToken: undefined,
    });
    return { message: 'Password changed' };
  }
  async sendRecoveryPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwt_secret_key, {
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

  signToken(
    user: userEntry,
    typeToken: jwtTokenType,
    expiredToken: Date
  ): string {
    const payload = {
      sub: user.id,
      role: user.role,
      token_type: typeToken,
      user_id: user.email,
      iat: Date.now(),
      exp: expiredToken.getTime(),
    };
    const token = jwt.sign(payload, config.jwt_secret_key);

    return token;
  }

  CreateAccessToken(user: userEntry): string {
    const expiredToken = new Date();
    expiredToken.setHours(expiredToken.getHours() + 3);

    const token = this.signToken(user, 'access_token', expiredToken);

    return token;
  }

  RefreshAccessToken(user: userEntry): string {
    const expiredToken = new Date();
    expiredToken.setMonth(expiredToken.getMonth() + 1);

    const token = this.signToken(user, 'refresh_token', expiredToken);

    return token;
  }

  decoderToken(token: string): JwtPayload {
    const decode = jwt.verify(token, config.jwt_secret_key);
    return decode as JwtPayload;
  }
}
