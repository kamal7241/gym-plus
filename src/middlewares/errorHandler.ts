// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors });
  } else {
    console.error(err);
    res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', errors: {} });
  }
}
