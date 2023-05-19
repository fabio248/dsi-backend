import boom from 'boom';
import { NextFunction, Request, Response } from 'express';

export function boomErrorHandler(
  error: boom<null>,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { output } = error;
  res
    .status(output.statusCode)
    .json({ error: output.payload.error, message: output.payload.message });
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { name, message } = error;
  res.status(500).json({ error: name, message });
}
