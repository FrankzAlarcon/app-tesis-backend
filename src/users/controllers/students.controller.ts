import { Body, Controller, Post } from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dtos/student.dto';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService
  ){}

  @Post()
  async create(
    @Body() data: CreateStudentDto
  ) {
    return await this.studentsService.create(data)
  }
}