import { IsEmail } from 'class-validator';

export class CreateUserDto {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  phoneNumber: string;

  password: string;

  avatarURL: string;
}

export class UpdateUserDto {
  firstName: string;
  lastName: string;
}
