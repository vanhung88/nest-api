import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignedUrlS3Dto } from './dto/upload.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFileS3(
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
    return this.uploadService.uploadS3(file.originalname, file.buffer);
  }

  @Post('signedUrlS3')
  signedUrlS3(@Body() signedUrL: SignedUrlS3Dto) {
    return this.uploadService.signedUrlS3(signedUrL);
  }

  @Post('/')
  upload(@Body() signedUrL: SignedUrlS3Dto) {
    return this.uploadService.signedUrlS3(signedUrL);
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
          const ext = extname(file.originalname); // .png
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/(jpg|jpeg|png|gif)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Get('picture/:filename')
  async getPicture(
    @Param('filename') filename,
    @Res() res: Response,
  ): Promise<void> {
    res.sendFile(filename, { root: './uploads' });
  }
}
