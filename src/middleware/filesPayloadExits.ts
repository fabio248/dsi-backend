import { NextFunction, Request, Response } from 'express';

//Verify is sent the files at the request
export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file)
    return res.status(400).json({ status: 'error', message: 'Missing files' });

  next();
};
