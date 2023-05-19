import { AppDataSource } from './data-source';
import { Application } from 'express';
import { createServer } from './utils/server';
import { config } from './config';

type Server = ReturnType<typeof app.listen>;

const app: Application = createServer();
let server: Server;
AppDataSource.initialize()
  .then(async () => {
    server = app.listen(config.port, () => {
      console.log(`Server Listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => console.error(error));

export { app, server };
