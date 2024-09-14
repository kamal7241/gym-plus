// UnauthorizedError.ts
import { AppError, ErrorObject } from './AppError';

export class UnauthorizedError extends AppError {
  constructor(message: string, errors?: ErrorObject) {
    super(401, message, errors);
    this.name = this.constructor.name;
  }
}
