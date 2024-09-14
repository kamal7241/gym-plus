// ConflictError.ts
import { AppError, ErrorObject } from './AppError';

export class ConflictError extends AppError {
  constructor(message: string, errors?: ErrorObject) {
    super(409, message, errors);
    this.name = this.constructor.name;
  }
}
