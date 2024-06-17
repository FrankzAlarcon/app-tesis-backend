import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from '../dtos/career.dto';

@Injectable()
export class CareersService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    return this.prismaService.career.findMany()
  }

  async create(data: CreateCareerDto) {
    return this.prismaService.career.create({
      data
    })
  }

  async remove(id: string) {
    return this.prismaService.career.delete({
      where: { id }
    })      
  }
}
