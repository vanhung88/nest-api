import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignedUrlS3Dto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/(jpg|jpeg|png|gif)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.upload(file.originalname, file.buffer);
  }

  @Post('signedUrlS3')
  signedUrlS3(@Body() signedUrL: SignedUrlS3Dto) {
    return this.uploadService.signedUrlS3(signedUrL);
  }
}
