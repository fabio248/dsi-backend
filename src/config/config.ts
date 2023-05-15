import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbPort: parseInt(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
};

const configJwt = {
  jwt_secret_key: 'gR7cH9Svfj8J Le4c186Ghs48hheb3902 nh5DsA',
};

export { config, configJwt };
