import { createUserWithPetSchema } from './../Schemas/user.schema';
import { hashSync } from 'bcryptjs';
import boom from 'boom';
import { User } from '../db/entity/User.entity';
import { AppDataSource } from '../data-source';
import {
  userEntry,
  userEntryWithoutSensitiveInfo,
  userWhitPetEntry,
} from '../utils/types/user';
import { config } from '../config';
import { mailBody } from '../utils/types/mailer';
import nodemailer from 'nodemailer';
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(data: userEntry): Promise<userEntryWithoutSensitiveInfo> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (user) {
      throw boom.badData('Email already taken');
    }

    const newUser: userEntry = Object.assign(new User(), {
      ...data,
      password: hashSync(data.password, 10),
      birthday: new Date(data.birthday),
    });

    await this.userRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }

  async getUserByEmail(email: string): Promise<userEntry> {
    const getuser: userEntry | null = await this.userRepository.findOneBy({
      email,
    });

    if (!getuser) {
      throw boom.notFound('User not found');
    }

    return getuser;
  }
  async getUserByEmailGoogle(email: string): Promise<userEntry> {
    const getuser: userEntry | null = await this.userRepository.findOneBy({
      email,
    });

    return getuser;
  }

  async getUserById(id: number): Promise<userEntry> {
    const getuser: userEntry | null = await this.userRepository.findOne({
      where: { id },
      relations: {
        pet: true,
      },
    });

    if (!getuser) {
      throw boom.badRequest('User not found');
    }

    delete getuser.password;

    return getuser;
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    const userDelete = await this.userRepository.delete({ id });
    return userDelete;
  }

  //obtener todos los usuarios
  async getAllUsers(): Promise<Array<userEntry>> {
    const allUser: Array<userEntry> = await this.userRepository.find();
    allUser.map((user: userEntry) => delete user.password);
    return allUser;
  }

  async updateUser(
    id: number,
    data: Partial<userEntry>
  ): Promise<userEntryWithoutSensitiveInfo> {
    //Check if exits the user
    await this.getUserById(id);

    if (data.password) {
      data.password = hashSync(data.password, 10);
    }
    //Update info
    await this.userRepository.update(id, data);

    const userUpdated = await this.getUserById(id);
    delete userUpdated.password;

    return userUpdated;
  }

  async sendEmailEventCalendar(email: string) {
    const user: userEntry | null = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw boom.notFound('User not found');
    }
    const text = 'https://calendar.google.com/calendar/u/0/r';
    const mail = {
      from: `${config.smtpEmail}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Ha sido agregado a un evento, revise su calendario', // Subject line
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
                    }.content {
                      text-align: center;
                      padding: 20px;
                      background-color: #ffffff;
                      color: #909497;
                    }
                    .footer {
                      padding: 20px;
                      background-color: #333333;
                      color: #ffffff;
                      text-align: center;
                    }
                    .container {
                      border-radius: 5px;
                      max-width: 700px;
                      margin: 1px auto;
                      padding: 10px;
                      background-color: #95A5A6;
                      
                    }
                    .header {
                      background-color: #333333;
                      padding: 20px;
                      color: #ffffff;
                      text-align: center;
                      height:150px
                    }
        
                  </style>  
                </head> 
              <body>
                 <div class="container">
                      <div class="header">
                          <h1>Veterinaria Mistum lo/a ha</h1>
                          <h1>Agregado a un evento de Google Calendar</h1>
                          <p>Click aquí para visualizar: <a href="${text}">Google Calendar</a></p>
                        </div>
                      <div class="footer">
                             <h1>Saludos cordiales les desea: <br>El equipo de Clínica Veterinaria Mistum.</h1>
                        </div>
                 </div>
             </body>
          </html>`, // html body
    };
    const sendEmail = this.sendMailCalendar(mail);
    return sendEmail;
  }

  async sendMailCalendar(infoEmail: mailBody) {
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
}
