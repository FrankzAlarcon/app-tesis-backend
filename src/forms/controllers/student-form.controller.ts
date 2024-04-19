import { Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadStudentFormDto } from '../dtos/student-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentFormService } from '../services/student-form.service';
import { GetStudentInfoByFormDto } from '../dtos/forms.dto';

@Controller('student-form')
export class StudentFormController {

  constructor(
    private readonly studenFormService: StudentFormService
  ) {}

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
