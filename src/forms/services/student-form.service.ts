import { PrismaService } from '@/database/services/prisma.service';
import { S3Service } from '@/database/services/s3.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { UploadStudentFormDto } from '../dtos/student-form.dto';
import { StudentForm } from '../entities/student-form.entity';
import { StudentFormStatus } from '@/global/enums/student-forms.enum';

@Injectable()
export class StudentFormService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService
  ) {}

  // the userId should be in the jwt
  async getStudentForm(
    id: string,
    // userId: string
  ) {
    // TODO: Validate that the requester is an admin
    const studentForm = await this.prismaService.studenForm.findFirst({
      where: { id },
      select: {
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException(`Student form does not exist`)
    }
    // const user = await this.prismaService.user.findFirst({
    //   where: { id },
    //   select: {
    //     roleId: true
    //   }
    // })

    const file = await this.s3Service.getObject(studentForm.url)
    return file;
  }

  async uploadStudentForm(file: Express.Multer.File, data: UploadStudentFormDto): Promise<StudentForm> {
    // TODO: add validations for studentId and formId
    const url = uuidv4() + `.${file.originalname.split('.').pop()}`
    const studentForm = this.prismaService.$transaction(async (tx) => {
      const studentForm = await tx.studenForm.create({
        data: {
          startDate: new Date(),
          formId: data.formId,
          studentId: data.studentId,
          status: StudentFormStatus.PENDIENTE,
          url,
        }
      })
      await this.s3Service.uploadObject(url, file.buffer)
      return studentForm;
    })

    return studentForm;
  }
}
