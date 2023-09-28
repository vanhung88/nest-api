import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });
  async upload(fileName: string, file: Buffer) {
    const fileNameSlugify = slugify(fileName);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileNameSlugify,
        Body: file,
      }),
    );
    return `https://tes-admin.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
  }

  async signedUrlS3(fileName: string) {
    const fileNameSlugify = slugify(fileName);

    const client = new S3Client({ region: process.env.AWS_S3_REGION });
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileNameSlugify,
    });
    return getSignedUrl(client, command, { expiresIn: 3600 });
  }
}
