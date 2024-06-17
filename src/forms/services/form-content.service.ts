import { S3Service } from '@/database/services/s3.service';
import { Injectable } from '@nestjs/common';
import { FormContentDto } from '../dtos/form-content.dto';

@Injectable()
export class FormContentService {
  constructor(
    private readonly s3Service: S3Service
  ) {}

  async create(_data: FormContentDto) {
    
  }
}
