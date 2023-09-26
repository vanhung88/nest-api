import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto, SignInDto } from './dto/auth.credentials';
import { hash, verify } from 'argon2';
import { JWTUser } from './auth.type';
import {
  generateAccessToken,
  generateRefreshToken,
} from 'src/shared/utils/token';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, ...rest } = signUpDto;
    if (!signUpDto?.username) {
      throw new NotFoundException('username is required');
    }
    const hashedPassword = await hash(password);
    return this.userService.createUser({
      email,
      password: hashedPassword,
      ...rest,
    });
  }

  genAccessToken(user: JWTUser) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInDto: SignInDto) {
    try {
      const foundUser = await this.userService.getUserByEmail(signInDto?.email);
      if (!foundUser) {
        throw new NotFoundException('user not found');
      }
      const { id, username, email } = foundUser;
      console.log(username);
      const isMathPassword = await verify(
        foundUser?.password,
        signInDto?.password,
      );
      if (!isMathPassword) {
        throw new NotFoundException('password not valid');
      }

      const tokens = this.genAccessToken({ id, username, email });
      console.log(tokens);
      return {
        ...tokens,
        user: foundUser,
      };
    } catch (error) {
      throw error.message;
    }
  }
}