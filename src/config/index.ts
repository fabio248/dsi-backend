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
  amazon: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  },
};

const configJwt = {
  jwt_secret_key: process.env.PASS_JWT,
};

export { config, configJwt };
