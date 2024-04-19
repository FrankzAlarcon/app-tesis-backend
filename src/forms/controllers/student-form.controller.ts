import { Body, Controller, Get, HttpCode, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadStudentFormDto } from '../dtos/student-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentFormService } from '../services/student-form.service';
import { GetStudentInfoByFormDto } from '../dtos/forms.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student Forms')
@Controller('student-form')
export class StudentFormController {

  constructor(
    private readonly studenFormService: StudentFormService
  ) {}

  @Get()
  async getStudentsForms(
    @Query() params: PaginationQueryDto
  ) {
    console.log('[controller]', params)
    return this.studenFormService.getStudentForms(params)
  }

  @Post('get-by-filename')
  @HttpCode(200)
  async getByFilename(
    @Body() data: GetStudentInfoByFormDto
  ) {
    return this.studenFormService.getStudentFormInfo(data)
  }

  @Post('upload-pending')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPendingForm(
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return this.studenFormService.uploadPendingStudentForm(file, data)
  }

  @Post('upload-approved')
  @UseInterceptors(FileInterceptor('file'))
  async uploadApprovedForm(
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return this.studenFormService.uploadApprovedStudentForm(file, data)
  }
}
