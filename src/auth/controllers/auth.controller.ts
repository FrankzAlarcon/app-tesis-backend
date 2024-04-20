import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth.dto';
import { CreateStudentDto } from '@/users/dtos/student.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: LoginDto
  ) {
    return await this.authService.login(data)
  }

  @Post('/register-student')
  async registerStudent(
    @Body() data: CreateStudentDto
  ) {
    return this.registerStudent(data)
  }
}
