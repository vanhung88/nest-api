import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(@Query('page') page?: string, @Query('size') size?: string) {
    return this.userService.getUsers({ page: +page, size: +size });
  }

  @Get(':id')
  getUserDetail(@Param('id') id: string) {
    return this.userService.getUserDetail(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() createUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
