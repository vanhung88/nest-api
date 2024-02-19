import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { ChatGateway } from './modules/chat/chatGateway';

@Module({
  imports: [UsersModule, AuthModule, UploadModule],
  providers: [ChatGateway],
})
export class AppModule {}
