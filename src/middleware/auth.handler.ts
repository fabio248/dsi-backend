import { Response, NextFunction, Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import boom from 'boom';
import { authService } from '../utils/dependencies/dependencies';

export function asureValidate(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw boom.unauthorized('Missing or invalid token');
    }
    const token = authorization.replace('Bearer ', '');

    const payload: JwtPayload = authService.decoderToken(token);
    const { exp } = payload;

    const currentData = new Date().getTime();

    if (exp <= currentData) {
      throw boom.clientTimeout('The token has been finalizated');
    }

    req['user'] = payload;

    next();
  } catch (error) {
    next(error);
  }
}
