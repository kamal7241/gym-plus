import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFile(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value instanceof Object && 'originalname' in value;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a file`;
        },
      },
    });
  };
}
