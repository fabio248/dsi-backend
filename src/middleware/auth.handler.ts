import { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { decoderToken } from '../utils/jwt';
import boom from 'boom';

export function asureValidate(req: any, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw boom.unauthorized('Missing or invalid token');
    }
    const token = authorization.replace('Bearer ', '');

    const payload: JwtPayload | string = decoderToken(token);
    const { exp } = payload as JwtPayload;

    const currentData = new Date().getTime();

    if (exp <= currentData) {
      throw boom.clientTimeout('The token has been finalizated');
    }

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}
