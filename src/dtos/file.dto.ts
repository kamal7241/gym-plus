// dtos/GetFileDTO.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class GetFileDTO {
  @IsString()
  @IsNotEmpty()
  filename!: string;

  @IsString()
  @IsNotEmpty()
  bucket!: string;
}
