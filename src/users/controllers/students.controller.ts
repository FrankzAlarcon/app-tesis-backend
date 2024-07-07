import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
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
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('/bookmarks')
  @Roles(Role.STUDENT)
  async getBookmarks(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload
    return this.studentsService.getBookmarks(user.studentId, params)
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

  @Get('/short-profile')
  @Roles(Role.STUDENT)
  async getShortProfile(
    @Req() req: any
  ) {
    const user = req.user as JwtPayload
    return this.profileService.getShortProfile(user.studentId)
  }

  @Get('/public/profile/:studentId')
  @Roles(Role.STUDENT, Role.ADMIN, Role.BUSINESS)
  async getPublicProfile(
    @Param('studentId') studentId: string
  ) {
    return this.profileService.getPublicProfile(studentId)
  }

  @Get('/forums')
  @Roles(Role.STUDENT)
  async getForums(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload
    return this.studentsService.getForums(user.studentId, params)
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateStudentDto
  ) {
    return await this.studentsService.create(data)
  }

  @Put('/update-image-profile')
  @Roles(Role.STUDENT)
  @UseInterceptors(FileInterceptor('image'))
  async updateImageProfile(
    @Req() req: any,
    @UploadedFile() image: Express.Multer.File
  ) {
    const user = req.user as JwtPayload
    return this.studentsService.updateImageProfile(user.studentId, image)
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
