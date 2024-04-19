import { S3Service } from '@/database/services/s3.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/services/prisma.service';
import { CreateFormDto } from '../dtos/forms.dto';

@Injectable()
export class FormsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService
  ) {}

  async create(data: CreateFormDto) {
    return this.prismaService.form.create({
      data
    });
  }
}
