import { IsEmail } from 'class-validator';

export class SignInDto {
  username: string;
  password: string;
}

export class SignUpDto {
  @IsEmail()
  email: string;
  username: string;
  password: string;
}
