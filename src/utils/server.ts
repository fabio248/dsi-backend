import express, { Application } from 'express';
import { routerApi } from '../routes';
import cors from 'cors';
import { userRouter } from '../routes/user.routes';
import { AuthRouter } from '../routes/auth.routes';

function createServer(): Application {
  const app: Application = express();
  //Middleware to handle json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  // rendering the routes
  app.use('/api/v1/', userRouter);
  app.use('/api/v1/', AuthRouter);

  routerApi(app);
  app.get('/ping', (_, res) => res.send('pong'));
  return app;
}

export { createServer };
