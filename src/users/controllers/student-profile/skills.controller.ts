import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';
import { CreateSkillDto } from '@/users/dtos/skills.dto';
import { SkillsService } from '@/users/services/student-profile/skills.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Skills') 
@UseGuards(AuthGuard)
@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService
  ) { }

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.BUSINESS)
  async getAll() {
    return this.skillsService.getAll();
  }

  @Post()
  @Roles(Role.ADMIN, Role.STUDENT, Role.BUSINESS)
  async create(
    @Body() data: CreateSkillDto
  ) {
    return this.skillsService.create(data);
  }

  @Post('/many')
  @Roles(Role.ADMIN, Role.STUDENT, Role.BUSINESS)
  async createMany(
    @Body() data: CreateSkillDto[]
  ) {
    return this.skillsService.createMany(data);
  }
}
