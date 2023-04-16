import express, { Application } from 'express';
import { routerApi } from '../routes';

function createServer(): Application {
  const app: Application = express();
  //Middleware to handle json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routerApi(app);
  app.get('/ping', (_, res) => res.send('pong'));
  return app;
}

export { createServer };
