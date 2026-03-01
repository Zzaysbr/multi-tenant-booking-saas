export class RegisterDto {
  email: string;
  password: string;
  role: 'customer' | 'owner';
}