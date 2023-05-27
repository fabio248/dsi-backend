import { Application, Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import { asureValidate, checkerRole } from '../middleware/auth.handler';
import { petRouter } from './pet.routes';

function routerApi(app: Application) {
  const router: Router = Router();
  app.use('/api/v1', router);
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/pets', [asureValidate, checkerRole('admin')], petRouter);
}

export { routerApi };
