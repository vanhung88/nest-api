import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma.service';
import { AuthenticationMiddleware } from 'src/middlewares/authMiddleware';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
// export class UsersModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthenticationMiddleware).forRoutes('/users');
//   }
// }
