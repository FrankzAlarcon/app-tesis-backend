import config from '@/config';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3Service = new S3Client({
    region: this.configService.aws.region,
  })

  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>
  ) {}

  async getPendingObject(filename: string, bucket?: string) {
    return this.s3Service.send(
      new GetObjectCommand({
        Bucket: bucket ?? this.configService.aws.pendingBucket,
        Key: filename
      })
    )
  }

  async getApprovedObject(filename: string, bucket?: string) {
    return this.s3Service.send(
      new GetObjectCommand({
        Bucket: bucket ?? this.configService.aws.approvedBucket,
        Key: filename
      })
    )
  }

  async uploadPendingObject(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.pendingBucket,
        Key: filename,
        Body: file
      })
    )
  }

  async uploadApprovedObject(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.approvedBucket,
        Key: filename,
        Body: file
      })
    )
  }
}
