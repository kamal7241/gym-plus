// InternalServerError.ts
import { AppError, ErrorObject } from './AppError';

export class InternalServerError extends AppError {
  constructor(message: string, errors?: ErrorObject) {
    super(500, message, errors);
    this.name = this.constructor.name;
  }
}
