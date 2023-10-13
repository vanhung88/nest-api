import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RolesGuard } from './modules/users/roles.guard';

@Module({
  imports: [UsersModule, AuthModule, UploadModule],
  // providers: [
  //   {
  //     provide: 'APP_GUARD',
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/upload');
  }
}
