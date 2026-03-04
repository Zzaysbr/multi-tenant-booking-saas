import { IsEmail, MinLength, IsIn, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: 'Password must contain at least one letter and one number',
  })
  password: string;

  @IsIn(['customer', 'owner'])
  role: 'customer' | 'owner';
}