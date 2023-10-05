import { IsEmail } from 'class-validator';
import { UserStatus } from 'src/modules/users/user.interface';

export class SignInDto {
  email: string;
  password: string;
}

export class SignUpDto {
  @IsEmail()
  email: string;

  password: string;

  avatarURL: string;

  status: UserStatus;
}
