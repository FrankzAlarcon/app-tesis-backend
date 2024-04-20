import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dtos/student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';

@ApiTags('Students')
@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService
  ){}

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() data: CreateStudentDto
  ) {
    return await this.studentsService.create(data)
  }
}
