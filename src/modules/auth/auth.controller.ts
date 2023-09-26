import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.credentials';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const newUser = await this.authService.signUp(signUpDto);
      return newUser;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      return this.authService.signIn(signInDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
