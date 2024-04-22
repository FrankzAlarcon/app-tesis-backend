import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAdminDto, LoginDto } from '../dtos/auth.dto';
import { CreateStudentDto } from '@/users/dtos/student.dto';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';

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
    return this.authService.registerStudent(data)
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  @Post('/register-admin')
  async registerAdmin(
    @Body() data: CreateAdminDto
  ){
    return this.authService.registerAdmin(data)
  }
}
