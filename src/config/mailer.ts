import nodemailer from 'nodemailer';

export const transporteEmail = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'veterinariamistum2013@gmail.com', // generated google account user
    pass: 'llhvnihrwpwjvtbe', // generated google account password and password MistumArtemis2013
  },
});