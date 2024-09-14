// AppError.ts
export interface ErrorObject {
  [key: string]: string[];
}
export class AppError extends Error {
  statusCode: number;
  errors?: ErrorObject;

  constructor(statusCode: number, message: string, errors?: ErrorObject) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
