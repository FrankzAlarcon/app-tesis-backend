import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { S3Service } from './services/s3.service';
import { PaginationService } from './services/pagination.service';

@Global()
@Module({
  providers: [PrismaService, S3Service, PaginationService],
  exports: [PrismaService, S3Service, PaginationService],
})
export class DatabaseModule {}
