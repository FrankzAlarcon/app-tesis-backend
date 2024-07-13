import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { S3Service } from './services/s3.service';
import { PaginationService } from './services/pagination.service';
import { PublicationsRepositoryService } from './services/repositories/publications-repository.service';
import { StudentsRepositoryService } from './services/repositories/students-repository.service';

@Global()
@Module({
  providers: [PrismaService, S3Service, PaginationService, PublicationsRepositoryService, StudentsRepositoryService],
  exports: [PrismaService, S3Service, PaginationService, PublicationsRepositoryService, StudentsRepositoryService],
})
export class DatabaseModule {}
