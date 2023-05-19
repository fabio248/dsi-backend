import express, { Application } from 'express';
import { routerApi } from '../routes';
import cors from 'cors';
import { boomErrorHandler, errorHandler } from '../middleware/error.handler';

function createServer(): Application {
  const app: Application = express();
  //Middleware to handle json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  routerApi(app);
  app.use(errorHandler);
  app.use(boomErrorHandler);
  app.get('/ping', (_, res) => res.send('pong'));
  return app;
}

export { createServer };
