import nodemailer from 'nodemailer';
import jwt, { JwtPayload } from 'jsonwebtoken';
import boom from 'boom';
import { config } from '../config';
import { UserService } from './user.service';
import { mailBody } from '../utils/types/mailer';
import { userEntry } from '../utils/types/user';
import { jwtTokenType } from '../utils/types/generic';
import { User } from '../db/entity/User.entity';

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

    await this.userService.updateUser(user.id, {
      password: newPassword,
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
    const link = `${config.urlFront}/changePassword?token=${token}`;
    await this.userService.updateUser(user.id, { recoveryToken: token });

    const mail = {
      maxAllowedSize: 10 * 1024 * 1024,
      from: `${config.smtpEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Correo para el cambio de contraseña', // Subject line
      html: `<html>
                <head>  
                   <style>
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #f5f5f5;
                      width:200px
                    }

                    h2 {
                      margin: 0;
                      font-size: 20px;
                      color: #5499C7;
                    }
                    h1 {
                      margin: 0;
                      font-size: 18px;
                      color: #5499C7;
                    }

                    p {
                      text-align: center;
                      color: #5499C7;
                      display: inline-block;
                      border-bottom: 1px solid black;
                    }
                    .content {
                      text-align: center;
                      padding: 20px;
                      background-color: #ffffff;
                      color: #909497;
                    }
                    .footer {
                      padding: 10px;
                      background-color: #333333;
                      color: #ffffff;
                      text-align: center;
                    }
                    .container {
                      border-radius: 5px;
                      max-width: 700px;
                      margin: 1px auto;
                      padding: 20px;
                      background-color: #95A5A6;
                      max-height:700px;
                    }
                    .header {
                      background-color: #333333;
                      padding: 20px;
                      color: #ffffff;
                      text-align: center;
                      height:150px
                    }
                    dl {
                      text-align: center;
                    }
        
                  </style>  
                </head> 
              <body>
                 <div class="container">
                      <div class="header">
                          <h2>Hola, Gracias por utilizar el servicio de recuperación de contraseña de Clínica Veterinaria Mistum</h2>
                          <p>Este correo es para cambiar tu contraseña.</p>
                        </div>
                      <div class="content">
                        <dl>
                          <dt text-align="center">Ingresa a este link para cambiar la contraseña:</dt>
                          <dt><a href="${link}">URL DE ACCESO</a></dt>
                          <p>¡¡Este link expirará en 15 minutos!!</p>
                        </dl>  
                       </div>
                          <div class="footer">
                             <h1>Saludos cordiales les desea: <br>El equipo de Clínica Veterinaria Mistum.</h1>
                          </div>
                 </div>
             </body>
          </html>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  signToken(
    user: Partial<User>,
    typeToken: jwtTokenType,
    expiredToken: Date
  ): string {
    const payload = {
      identify: user.id,
      role: user.role,
      token_type: typeToken,
      user_id: user.email,
      iat: Date.now(),
      exp: expiredToken.getTime(),
    };
    const token = jwt.sign(payload, config.jwt_secret_key);

    return token;
  }

  CreateAccessToken(user: Partial<User>): string {
    const expiredToken = new Date();
    expiredToken.setHours(expiredToken.getHours() + 6);

    const token = this.signToken(user, 'access_token', expiredToken);

    return token;
  }

  RefreshAccessToken(user: Partial<User>): string {
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
