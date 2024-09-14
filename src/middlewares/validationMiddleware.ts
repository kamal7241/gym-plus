import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { ErrorObject } from '../errors/AppError';

const validationMiddleware = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(DtoClass, {
      ...req.body,
      ...req.params,
      ...req.query,
      ...req.files,
    });
    
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorObject: ErrorObject = {};

      errors.forEach((error: ValidationError) => {
        const propertyName = error.property;
        const constraints = error.constraints || {};

        errorObject[propertyName] = Object.values(constraints);
      });

      next(new BadRequestError(errorObject));
      return;
    }

    (req as any).dtoInstance = dtoInstance;
    next();
  };
};

export default validationMiddleware;
