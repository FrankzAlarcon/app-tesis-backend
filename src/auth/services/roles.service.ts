import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async checkRole(roleId: string, authorizedRoles: string[]) {
    const userRole = await this.prismaService.role.findFirst({ where: { id: roleId }})
    if (!userRole) {
      throw new BadRequestException('Role not found')
    }

    return authorizedRoles.includes(userRole.name)
  }

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prismaService.role.create({
      data
    })
  }
}
