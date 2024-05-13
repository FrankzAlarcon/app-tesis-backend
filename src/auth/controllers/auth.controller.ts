import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAdminDto, LoginDto } from '../dtos/auth.dto';
import { CreateStudentDto } from '@/users/dtos/student.dto';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CreateBusinessDto } from '@/users/dtos/business.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @Post('/register-business')
  async registerBusiness(
    @Body() data: CreateBusinessDto
  ) {
    return this.authService.registerBusiness(data)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Post('/register-admin')
  async registerAdmin(
    @Body() data: CreateAdminDto
  ){
    return this.authService.registerAdmin(data)
  }

  @Post('/is-logged-in')
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.STUDENT, Role.BUSINESS)
  async isLogged() {
    return { isLoggedIn: true }
  }
}
