import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Validate,
  IsInt,
  IsDate,
  IsBoolean,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsDateFormat } from '../helpers/isDateFormat'; // Assuming you have a custom date format validator
import { Gender, SubscriptionStatus, SubscriptionType } from '@prisma/client';
import { IsFile } from '../helpers/isFileDecorator';
import { stringToBoolean } from '../helpers/custom-transformers';
import dayjs from 'dayjs';

export class CreateTraineeDTO {
  @IsString()
  @IsNotEmpty()
  parcode!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dob must be in the format YYYY-MM-DD',
  })
  dob!: string;

  @IsEnum(SubscriptionType)
  @IsNotEmpty()
  subscriptionType!: SubscriptionType;

  @IsEnum(SubscriptionStatus)
  @IsNotEmpty()
  subscriptionStatus!: SubscriptionStatus;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'subscriptionDate must be in the format YYYY-MM-DD',
  })
  subscriptionDate!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'subscriptionStartDate must be in the format YYYY-MM-DD',
  })
  subscriptionStartDate!: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionMonths!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  subscriptionClasses!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  paid!: number;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  reminder!: number;

  @IsNotEmpty()
  idFace!: any;

  @IsNotEmpty()
  idBack!: any;

  @IsOptional()
  @IsString()
  trainingName?: string;

  @IsOptional()
  @IsString()
  offerName?: string;

  @IsOptional()
  @IsString()
  medicalProblem?: string;

  @IsOptional()
  @Transform(({ value }) => stringToBoolean(value), { toClassOnly: true })
  @IsBoolean()
  surgeries?: boolean;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  sundayNote?: string;

  @IsOptional()
  @IsString()
  mondayNote?: string;

  @IsOptional()
  @IsString()
  tuesdayNote?: string;

  @IsOptional()
  @IsString()
  wednesdayNote?: string;

  @IsOptional()
  @IsString()
  thursdayNote?: string;

  @IsOptional()
  @IsString()
  fridayNote?: string;

  @IsOptional()
  @IsString()
  saturdayNote?: string;

  @IsOptional()
  @IsString()
  generalNote?: string;

  get dobAsDate(): Date {
    return this.dob ? new Date(this.dob) : new Date(Date.now());
  }

  get subscriptionDateAsDate(): Date {
    return this.subscriptionDate
      ? new Date(this.subscriptionDate)
      : new Date(Date.now());
  }

  get subscriptionStartDateAsDate(): Date {
    return this.subscriptionStartDate
      ? new Date(this.subscriptionStartDate)
      : new Date(Date.now());
  }

  get subscriptionEndDateAsDate(): Date {
    const startDate = this.subscriptionStartDateAsDate;
    if (startDate && this.subscriptionMonths >= 0) {
      return dayjs(startDate).add(this.subscriptionMonths, 'month').toDate();
    }
    return new Date(Date.now());
  }

  get totalSubscriptionClasses(): number {
    if (this.subscriptionMonths >= 0 && this.subscriptionClasses > 0) {
      return this.subscriptionMonths * this.subscriptionClasses;
    }
    return 0;
  }

  get idFaceAsPath(): string {
    return `trainees/${this.idFace[0].filename}`;
  }

  get idBackAsPath(): string {
    return `trainees/${this.idBack[0].filename}`;
  }
}

export class UpdateTraineeDTO {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  parcode!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dob must be in the format YYYY-MM-DD',
  })
  dob!: string;

  @IsEnum(SubscriptionType)
  @IsNotEmpty()
  subscriptionType!: SubscriptionType;

  // @IsEnum(SubscriptionStatus)
  // @IsNotEmpty()
  // subscriptionStatus!: SubscriptionStatus;

  @IsString()
  @IsNotEmpty()
  subscriptionDate!: string;

  @IsString()
  @IsNotEmpty()
  subscriptionStartDate!: string;

  // @IsInt()
  // @IsNotEmpty()
  // @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  // subscriptionMonths!: number;

  // @IsInt()
  // @IsNotEmpty()
  // @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  // subscriptionClasses!: number;

  // @IsInt()
  // @IsNotEmpty()
  // @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  // paid!: number;

  // @IsInt()
  // @IsNotEmpty()
  // @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  // reminder!: number;
}

export class UpdateTraineeNotesDTO {
  @IsOptional()
  @IsString()
  trainingName?: string;

  @IsOptional()
  @IsString()
  offerName?: string;

  @IsOptional()
  @IsString()
  medicalProblem?: string;

  @IsOptional()
  @Transform(({ value }) => stringToBoolean(value), { toClassOnly: true })
  @IsBoolean()
  surgeries?: boolean;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  sundayNote?: string;

  @IsOptional()
  @IsString()
  mondayNote?: string;

  @IsOptional()
  @IsString()
  tuesdayNote?: string;

  @IsOptional()
  @IsString()
  wednesdayNote?: string;

  @IsOptional()
  @IsString()
  thursdayNote?: string;

  @IsOptional()
  @IsString()
  fridayNote?: string;

  @IsOptional()
  @IsString()
  saturdayNote?: string;

  @IsOptional()
  @IsString()
  generalNote?: string;
}
