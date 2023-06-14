import { NextFunction, Request, Response } from 'express';

const MB = 5; //5 MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

// Middleware to limit the file size of uploaded files
export const fileSizeLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.file;

  const filesOverLimit = [];
  // Check which files are over the size limit
  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      filesOverLimit.push(files[key].name);
    }
  });

  // If there are files over the limit, return an error response
  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    // Construct the error message
    const sentence =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replace(
        new RegExp(',', 'g'),
        ', '
      );

    const message =
      filesOverLimit.length < 3
        ? sentence.replace(',', ' and')
        : sentence.replace(/,(?=[^,]*$)/, ' and');

    // Return the error response with status code 413 (Request Entity Too Large)
    return res.status(413).json({ name: 'error', message });
  }

  // If all files are within the size limit, call the next middleware
  next();
};
