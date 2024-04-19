import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dtos/roles.dto';
import { Role } from '../entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    return this.prismaService.role.findMany()
  }

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prismaService.role.create({
      data
    })
  }
}
