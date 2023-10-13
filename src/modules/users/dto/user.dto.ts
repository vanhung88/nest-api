import { IsEmail } from 'class-validator';
import { UserRole, UserStatus } from '../user.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;

  // firstName: string;

  // lastName: string;

  password: string;

  avatarURL: string;

  // phoneNumber: string;

  status: UserStatus;

  role: UserRole;
}

export class UpdateUserDto {
  status: UserStatus;

  avatarURL: string;
}
