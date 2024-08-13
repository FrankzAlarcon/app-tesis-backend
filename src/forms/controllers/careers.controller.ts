import { AuthGuard } from '@/global/guards/auth.guard';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CareersService } from '../services/careers.service';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CreateCareerDto } from '../dtos/career.dto';

@ApiBearerAuth()
@ApiTags('Careers')
@UseGuards(AuthGuard)
@Controller('careers')
export class CareersController {
  constructor(
    private readonly careersService: CareersService
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT)
  async getAll() {
    return this.careersService.getAll()
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() data: CreateCareerDto
  ) {
    return this.careersService.create(data)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: string
  ) {
    return this.careersService.remove(id)
  }
}
