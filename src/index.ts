import { AppDataSource } from './data-source';
import { Application } from 'express';
import { createServer } from './utils/server';
import config from './config/config';

type Server = ReturnType<typeof app.listen>;

const app: Application = createServer();
let server: Server;
AppDataSource.initialize()
  .then(async () => {
    server = app.listen(config.port, () => {
      console.log(`Server running on ${config.port}`);
    });
  })
  .catch((error) => console.log(error));

export { app, server };
