import { Application, Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

function routerApi(app: Application) {
  const router: Router = Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
}

export { routerApi };
