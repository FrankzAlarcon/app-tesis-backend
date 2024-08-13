import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';
import { CreateProjectDto } from '@/users/dtos/projects.dto';
import { ProjectsService } from '@/users/services/student-profile/projects.service';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Projects') 
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get('/by-student')
  @Roles(Role.STUDENT)
  async getByStudent(
    @Req() req: any
  ) {
    const studentId = req.user.studentId;
    return this.projectsService.getByStudent(studentId);
  }

  @Post()
  @Roles(Role.STUDENT)
  async create(
    @Req() req: any,
    @Body() data: CreateProjectDto
  ) {
    const studentId = req.user.studentId;
    return this.projectsService.create(data, studentId);
  }

  @Delete(':id')
  @Roles(Role.STUDENT)
  async remove(
    @Req() req: any,
    @Param('id') id: string 
  ) {
    const studentId = req.user.studentId;
    return this.projectsService.remove(id, studentId);
  }
}
