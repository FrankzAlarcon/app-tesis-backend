import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CompleteStudentProfileDto, CreateStudentDto } from '../dtos/student.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { ProfileService } from '../services/student-profile/profile.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@ApiTags('Students')
@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly profileService: ProfileService
  ){}

  @Get('/feed')
  @Roles(Role.STUDENT)
  async getFeed(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload
    return this.studentsService.getFeed(user.studentId, params)
  }

  @Get('/profile')
  @Roles(Role.ADMIN, Role.STUDENT)
  async getProfile(
    @Req() req: any
  ) {
    const user  = req.user as JwtPayload
    if (!user.studentId) {
      throw new BadRequestException('Student not found')
    }
    return this.profileService.studentProfileInfo(user.studentId)
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateStudentDto
  ) {
    return await this.studentsService.create(data)
  }

  @Put('/complete-profile')
  @Roles(Role.STUDENT)
  async completeProfile(
    @Req() req: any,
    @Body() data: CompleteStudentProfileDto
  ) {
    const user = req.user as JwtPayload
    return this.studentsService.completeProfile(user.studentId, data)
  }

}
