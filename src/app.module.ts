import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [UsersModule, AuthModule, UploadModule],
})
export class AppModule {}
