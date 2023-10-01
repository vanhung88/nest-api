import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'prisma.service';
import { UserStatus } from './user.interface';

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
    const { email, status = UserStatus.ACTIVE } = createUserDto;
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new ConflictException('email already exists');
    }
    return this.prisma.user.create({
      data: { ...createUserDto, status },
    });
  }
  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
