import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { users } from './mock';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(page: number, size: number) {
    console.log('debug', page, size);
    return users;
  }

  async getUserDetail(id: string) {
    console.log('debug', id);
    const found = users.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException(`${id} not found`);
    }
    return found;
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    console.log('debug', updateUserDto);
    return { id: 'sus', name: 'hung' };
  }
}
