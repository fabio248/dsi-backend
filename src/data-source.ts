import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import { BaseEntity } from './db/entity/BaseEntity';
import { Person } from './db/entity/Person';
import { User } from './db/entity/User';
import { Client } from './db/entity/Client';

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
  entities: [BaseEntity, Person, User, Client],
  migrations: [],
  subscribers: [],
});
