import {
  Body, Controller, Get, HttpCode, 
  HttpStatus, 
  Post, Query, Req, Res, StreamableFile, UploadedFile,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { DownloadStudentFormDto, UploadStudentFormDto } from '../dtos/student-form.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentFormService } from '../services/student-form.service';
import { GetStudentInfoByFormDto } from '../dtos/forms.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { Response } from 'express';
import { JwtPayload } from '@/global/interfaces/jwt.interface';

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
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  async getByFilename(
    @Body() data: GetStudentInfoByFormDto
  ) {
    return this.studenFormService.getStudentFormInfo(data)
  }

  @Post('upload-pending')
  @Roles(Role.ADMIN, Role.STUDENT)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPendingForm(
    @Req() req: any,
    @Body() data: UploadStudentFormDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const user = req.user as JwtPayload
    return this.studenFormService.uploadPendingStudentForm(file, {
      ...data,
      studentId: user.studentId
    })
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

  @Post('/download-pending')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  async downloadPendingForm(
    @Body() data: DownloadStudentFormDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const responseDocument = await this.studenFormService.downloadPendingForm(data)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${responseDocument.filename}`);
    const byteDocument = await responseDocument.file.transformToByteArray()
    return new StreamableFile(byteDocument)
  }

  @Post('/download-approved')
  @Roles(Role.ADMIN)
  async downloadApprovedForm(
    @Body() data: DownloadStudentFormDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const responseDocument = await this.studenFormService.downloadApprovedForm(data)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${responseDocument.filename}`);
    const byteDocument = await responseDocument.file.transformToByteArray()
    return new StreamableFile(byteDocument)
  }
}
