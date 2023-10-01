import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { SignedUrlS3Dto } from './dto/upload.dto';
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

  async signedUrlS3(signedUrL: SignedUrlS3Dto) {
    try {
      const client = new S3Client({ region: 'ap-southeast-1' });
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: signedUrL.key,
        ContentType: signedUrL.type,
      });
      const res = await getSignedUrl(client, command, { expiresIn: 36000 }); // 3600 seconds
      return {
        url: res.split('?')[0],
        signedRequest: res,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
