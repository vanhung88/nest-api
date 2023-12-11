import { IsEmail } from 'class-validator';
import { UserStatus } from '../user.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;
  username: string;
  password: string;
}

export class UpdateUserDto {
  status: UserStatus;

  avatarURL: string;
}
