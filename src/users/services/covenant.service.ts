import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCovenantDto } from '../dtos/covenant.dto';

@Injectable()
export class CovenantService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    return this.prismaService.covenant.findMany();
  }

  async create(data: CreateCovenantDto) {
    return this.prismaService.covenant.create({
      data
    })
  }
}
