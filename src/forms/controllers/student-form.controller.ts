import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadStudentFormDto } from '../dtos/student-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentFormService } from '../services/student-form.service';

@Controller('student-form')
export class StudentFormController {

  constructor(
    private readonly studenFormService: StudentFormService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadForm(
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file)
    return this.studenFormService.uploadStudentForm(file, {
      ...data,
      
      formId: 'a1503cc3-b1f8-4497-8979-15ed075c6239'
    })
  }
}
