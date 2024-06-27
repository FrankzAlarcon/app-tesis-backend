import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from '@/config';

@Injectable()
export class S3Service {
  private readonly s3Service = new S3Client({
    region: this.configService.aws.region,
  })

  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>
  ) {}

  private async signUrl(command: GetObjectCommand, options?: any) {
    return getSignedUrl(this.s3Service, command, options)
  }

  async getPendingObject(filename: string, bucket?: string) {
    return this.s3Service.send(
      new GetObjectCommand({
        Bucket: bucket ?? this.configService.aws.pendingBucket,
        Key: 'pending/' + filename
      })
    )
  }

  async getSignedUrlObject(filename: string, options?: any, bucket?: string) {
    const command = new GetObjectCommand({
      Bucket: bucket ?? this.configService.aws.imageProfileBucket,
      Key: filename
    })
    const response = await this.signUrl(command, options)

    console.log('get Signed Url Object | output', response)

    return response
  }

  async getApprovedObject(filename: string, bucket?: string) {
    return this.s3Service.send(
      new GetObjectCommand({
        Bucket: bucket ?? this.configService.aws.approvedBucket,
        Key: 'approved/' + filename
      })
    )
  }

  async uploadPendingObject(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.pendingBucket,
        Key: 'pending/' + filename,
        Body: file
      })
    )
  }

  async uploadApprovedObject(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.approvedBucket,
        Key: 'approved/' + filename,
        Body: file
      })
    )
  }

  async uploadCV(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.cvBucket,
        Key: filename,
        Body: file
      })
    )
  }

  async uploadProfileImage(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.imageProfileBucket,
        Key: filename,
        Body: file
      })
    )
  }

  async uploadPublicationImage(filename: string, file: Buffer, bucket?: string) {
    return await this.s3Service.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.configService.aws.publicationImageBucket,
        Key: filename,
        Body: file
      })
    )
  }

  async removeProfileImage(filename: string, bucket?: string) {
    return await this.s3Service.send(
      new DeleteObjectCommand({
        Bucket: bucket ?? this.configService.aws.imageProfileBucket,
        Key: filename
      })
    )
  }
}
