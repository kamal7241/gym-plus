// ForbiddenError.ts
import { AppError, ErrorObject } from './AppError';

export class ForbiddenError extends AppError {
  constructor(message: string, errors?: ErrorObject) {
    super(403, message, errors);
    this.name = this.constructor.name;
  }
}
