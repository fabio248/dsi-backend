import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: USER,
  password: PASSWORD,
  database: config.dbName,
  synchronize: true,
  logging: false,
  entities: ['src/db/entity/**/*.entity.ts'],
  migrations: [],
  subscribers: [],
});
