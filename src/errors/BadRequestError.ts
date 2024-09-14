// BadRequestError.ts
import { AppError, ErrorObject } from './AppError';

export class BadRequestError extends AppError {
  constructor(errors?: ErrorObject) {
    super(400, 'VALIDATION_ERROR', errors);
    this.name = this.constructor.name;
  }
}
