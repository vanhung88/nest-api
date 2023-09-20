import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { users } from './mock';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(page: number, size: number) {
    try {
      const items = await this.prisma.user.findMany({
        skip: (page - 1) * size,
        take: size,
      });
      const total = await this.prisma.user.count();
      return {
        items,
        page,
        size,
        total,
      };
    } catch (error) {}
    return this.prisma.user.findMany();
  }

  async getUserDetail(id: any) {
    const found = this.prisma.user.findUnique({
      where: { id },
    });
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

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
