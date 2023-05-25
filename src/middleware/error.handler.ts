import boom from 'boom';
import { NextFunction, Request, Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

export function boomErrorHandler(
  error: boom<null>,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.isBoom) {
    const { output } = error;
    res
      .status(output.statusCode)
      .json({ error: output.payload.error, message: output.payload.message });
  } else {
    next(error);
  }
}
export function ormErrorHandler(
  error: QueryFailedError | TypeORMError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res
    .status(500)
    .json({ name: `database error: ${error.name}`, message: error });
}
export function errorHandler(
  error: TypeError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(500).json({
    error: error.name,
    message: error,
    stack: error.stack ? error.stack : undefined,
  });
}
