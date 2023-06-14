import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileService } from '../utils/dependencies/dependencies';

// This function returns a middleware function that filters incoming files based on their extensions
export const fileExtLimiter = (allowedExtArray: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Get files from the request
    const files = req.file;

    // Extract file extensions from each file

    const fileExtensions = [];
    fileExtensions.push(fileService.getTypeFile(files.originalname));

    // Check if all file extensions are allowed
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    // If a file has a disallowed extension, return an error message
    if (!allowed) {
      const message =
        `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replace(
          new RegExp(',', 'g'),
          ', '
        );
      // Return the error response with status code 422 (Unprocessable Entity)
      return res.status(422).json({ name: 'error', message });
    }
    // If all file extensions are allowed, proceed to the next middleware
    next();
  };
};
