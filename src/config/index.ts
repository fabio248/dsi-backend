import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbPort: parseInt(process.env.DB_PORT as string),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  smtpEmail: process.env.SMPT_EMAIL,
  smtpPassword: process.env.SMPT_PASSWORD,
  smtpHost: process.env.SMPT_HOST,
  smtpPort: process.env.SMPT_PORT,
  urlFront: process.env.URL_FRONT,
  jwt_secret_key: process.env.PASS_JWT as Secret,
};

const configJwt = {
  jwt_secret_key: process.env.PASS_JWT,
};

export { config, configJwt };
