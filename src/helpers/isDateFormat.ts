import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDateFormat', async: false })
export class IsDateFormat implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    // Regular expression to match the "yyyy-mm-dd" format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid date format. Date must be in YYYY-MM-DD format';
  }
}
