import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dtos/roles.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';

@ApiTags('Roles')
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Get()
  async getAll() {
    return await this.rolesService.getAll()
  }

  @Post()
  async create(
    @Body() data: CreateRoleDto
  ) {
    return await this.rolesService.create(data)
  }
}
