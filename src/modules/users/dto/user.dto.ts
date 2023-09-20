import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '../user.interface';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  avatarURL: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}

export class UpdateUserDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
