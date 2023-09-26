import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '../user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  password: string;

  avatarURL: string;

  status: UserStatus;
}

export class UpdateUserDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
