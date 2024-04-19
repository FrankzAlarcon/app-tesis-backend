import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { S3Service } from './services/s3.service';

@Global()
@Module({
  providers: [PrismaService, S3Service],
  exports: [PrismaService, S3Service],
})
export class DatabaseModule {}
