import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });
  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'tes-admin',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
