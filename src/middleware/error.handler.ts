import boom from 'boom';
import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
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
  if (error instanceof MulterError) {
    res.status(400).json({
      name: `${error.name}`,
      message: "the name of file must be 'exam'",
    });
  }
  console.error(error);
  res.status(500).json({ name: `${error.name}`, message: error.stack });
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
