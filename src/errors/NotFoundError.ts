// NotFoundError.ts
import { AppError, ErrorObject } from './AppError';

export class NotFoundError extends AppError {
  constructor(message: string, errors?: ErrorObject) {
    super(404, message, errors);
    this.name = this.constructor.name;
  }
}
