import { PrismaService } from '@/database/services/prisma.service';
import { CreateSkillDto } from '@/users/dtos/skills.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }


  async getAll() {
    return this.prismaService.skill.findMany();
  }

  async create(data: CreateSkillDto) {
    return this.prismaService.skill.create({
      data
    });
  }

  async createMany(data: CreateSkillDto[]) {
    return this.prismaService.skill.createMany({
      data
    });
  }
}
