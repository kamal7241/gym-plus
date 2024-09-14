import { IsString, MinLength, IsNotEmpty } from 'class-validator';

class LoginDTO {
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  constructor(phoneNumber: string, password: string) {
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

export default LoginDTO;
