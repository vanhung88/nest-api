import { IsEmail, IsEnum } from 'class-validator';
import { UserStatus } from '../user.interface';

export class CreateUserDto {
  userName: string;

  @IsEmail()
  email: string;

  password: string;

  avatarURL: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}

export class UpdateUserDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
