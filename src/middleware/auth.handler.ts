import { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { decoderToken } from '../utils/jwt';

export function asureValidate(req: any, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(403).send({ massage: 'Need token authorization' });
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '');

    const payload = decoderToken(token);
    const { exp } = payload as JwtPayload;

    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(408).json({ msg: 'The token has been finalizated' });
    }

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}
