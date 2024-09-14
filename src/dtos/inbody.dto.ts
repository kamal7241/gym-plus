import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateInBodyDTO {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  traineeId!: number;

  // Body measurements
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  length!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  weight!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  shoulder!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  chest!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  belowChest!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  middle!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  stomach!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  buttocks!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  thigh!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  arm!: number;

  // Health metrics
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  BMI!: number;

  @IsString()
  currentSituation!: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  dailyWaterNeed!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  caloriesRequired!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  muscleWeight!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  fatMass!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  boneDensity!: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  bellyFat!: number;

  // Optional field
  @IsOptional()
  dietFile?: any;
}

export class UpdateInBodyDTO {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  traineeId!: number;

  // Body measurements
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  length!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  weight!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  shoulder!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  chest!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  belowChest!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  middle!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  stomach!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  buttocks!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  thigh!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  arm!: number;

  // Health metrics
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  BMI!: number;

  @IsOptional()
  @IsString()
  currentSituation!: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  dailyWaterNeed!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  caloriesRequired!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  muscleWeight!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  fatMass!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  boneDensity!: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  bellyFat!: number;

  // Optional field
  @IsOptional()
  @IsOptional()
  dietFile?: any;
}
