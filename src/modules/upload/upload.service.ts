import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { SignedUrlS3Dto } from './dto/upload.dto';
@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });
  async uploadS3(fileName: string, file: Buffer) {
    const fileNameSlugify = slugify(fileName);
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileNameSlugify,
        Body: file,
      }),
    );
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
  }

  async signedUrlS3(signedUrL: SignedUrlS3Dto) {
    try {
      const client = new S3Client({ region: 'ap-southeast-1' });
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: signedUrL.key,
        ContentType: signedUrL.type,
      });
      const res = await getSignedUrl(client, command, { expiresIn: 60 }); // 60 seconds

      const commandGet = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: signedUrL.key,
      });
      const url = await getSignedUrl(client, commandGet, {
        expiresIn: 60,
      }); // 1 min

      return {
        url,
        signedRequest: res,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
