import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  MinLength,
  Validate,
  IsOptional,
} from 'class-validator';
import { Match } from '../helpers/MatchDecorator';
import { IsDateFormat } from '../helpers/isDateFormat';
import { Transform } from 'class-transformer';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CreateSecretaryDTO {
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsEnum(Gender, { message: 'Gender must be either MALE or FEMALE' })
  gender: Gender;

  @IsString({ message: 'Date of birth must be a string' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  @Validate(IsDateFormat, {
    message: 'Invalid date format. Date must be in YYYY-MM-DD format',
  })
  dob: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: 'Passwords must match' })
  confirm_password: string;

  constructor(
    phoneNumber: string,
    fullName: string,
    gender: Gender,
    dob: string,
    password: string,
    confirm_password: string
  ) {
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.gender = gender;
    this.dob = dob;
    this.password = password;
    this.confirm_password = confirm_password;
  }
}

export class UpdateSecretaryDTO {
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Full name must be a string' })
  fullName?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Gender must be either MALE or FEMALE' })
  gender?: Gender;

  @IsOptional()
  @IsString({ message: 'Date of birth must be a string' })
  @Validate(IsDateFormat, {
    message: 'Invalid date format. Date must be in YYYY-MM-DD format',
  })
  dob?: string;
}
