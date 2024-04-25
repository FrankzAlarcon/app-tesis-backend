import { Body, Controller, Get, HttpCode, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadStudentFormDto } from '../dtos/student-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentFormService } from '../services/student-form.service';
import { GetStudentInfoByFormDto } from '../dtos/forms.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';

@ApiTags('Student Forms')
@UseGuards(AuthGuard)
@Controller('student-form')
export class StudentFormController {

  constructor(
    private readonly studenFormService: StudentFormService
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  async getStudentsForms(
    @Query() params: PaginationQueryDto
  ) {
    return this.studenFormService.getStudentForms(params)
  }

  @Post('get-by-filename')
  @HttpCode(200)
  @Roles(Role.ADMIN)
  async getByFilename(
    @Body() data: GetStudentInfoByFormDto
  ) {
    return this.studenFormService.getStudentFormInfo(data)
  }

  @Post('upload-pending')
  @Roles(Role.STUDENT)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPendingForm(
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return this.studenFormService.uploadPendingStudentForm(file, data)
  }

  @Post('upload-approved')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  async uploadApprovedForm(
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return this.studenFormService.uploadApprovedStudentForm(file, data)
  }
}
