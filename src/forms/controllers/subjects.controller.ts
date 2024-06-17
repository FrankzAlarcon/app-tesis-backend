import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { CreateSubjectDto } from '../dtos/subject.dto';
import { Role } from '@/global/enums/roles.enum';

@ApiTags('Subjects')
@UseGuards(AuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService
  ) {}

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT)
  async getAll() {
    return this.subjectsService.getAll()
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() data: CreateSubjectDto
  ) {
    return this.subjectsService.create(data)
  }

  @Post('/many')
  @Roles(Role.ADMIN)
  async createMany(
    @Body() data: CreateSubjectDto[]
  ) {
    return this.subjectsService.createMany(data)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(
    @Param('id') id: string
  ) {
    return this.subjectsService.remove(id)
  }
}
