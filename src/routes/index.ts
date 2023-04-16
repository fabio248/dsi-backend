import { Application, Router } from 'express';

function routerApi(app: Application) {
  const router: Router = Router();
  app.use('/api/v1', router);
}

export { routerApi };
