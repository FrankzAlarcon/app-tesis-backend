import { PrismaService } from '@/database/services/prisma.service';
import { S3Service } from '@/database/services/s3.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { DownloadStudentFormDto, UploadStudentFormDto } from '../dtos/student-form.dto';
import { StudentForm } from '../entities/student-form.entity';
import { StudentFormStatus } from '@/global/enums/student-forms.enum';
import { GetStudentInfoByFormDto } from '../dtos/forms.dto';
import { PaginationService } from '@/database/services/pagination.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@Injectable()
export class StudentFormService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async getStudentForms(params: PaginationQueryDto) {
    return await this.paginationService.paginate(this.prismaService.studenForm, params)
  }

  async getPendingFormsByStudentId(studentId: string) {
    const studentForms = await this.prismaService.studenForm.findMany({
      where: {
        studentId,
        status: StudentFormStatus.PENDIENTE
      }
    })
    return studentForms
  }

  // the userId should be in the jwt
  async getStudentFormInfo(
    data: GetStudentInfoByFormDto,
    // userId: string
  ) {
    // TODO: Validate that the requester is an admin
    // TODO: Improve the query using postgresql views
    // TODO: Validate the name convention on back, also en front
    const studentFormsInfo = await this.prismaService.studenForm.findMany({
      where: {
        id: { in: data.studentFormIds }
      },
      include: {
        student: {
          include: {
            user: true
          }
        }
      }
    })
    if (!studentFormsInfo) {
      throw new NotFoundException(`Student form does not exist`)
    }

    return studentFormsInfo.map((studentForm) => ({
      id: studentForm.id,
      filename: studentForm.url,
      user: {
        name: studentForm.student.user.name
      }
    }))
  }

  // TODO: Valid this could be used by students
  async uploadPendingStudentForm(file: Express.Multer.File, data: UploadStudentFormDto): Promise<StudentForm> {
    // TODO: add validations for studentId and formId
    const [student, form] = await Promise.all([
      this.prismaService.student.findFirst({ where: { id: data.studentId }}),
      this.prismaService.form.findFirst({ where: { id: data.formId }})
    ])
    if (!student) {
      throw new NotFoundException('Student not found')
    }
    if (!form) {
      throw new NotFoundException('Form not found')
    }
    const formContent = JSON.parse(data.data)
    const url = uuidv4() + `.${file.originalname.split('.').pop()}`
    const studentForm = this.prismaService.$transaction(async (tx) => {
      const studentForm = await tx.studenForm.create({
        data: {
          startDate: new Date(),
          formId: data.formId,
          studentId: data.studentId,
          status: StudentFormStatus.EMITIDO,
          url,
        }
      })
      await this.s3Service.uploadPendingObject(url, file.buffer)
      await tx.formContent.create({
        data: {
          career: formContent.career || null,
          modality: formContent.modality || null,
          businessData: formContent.businessData || null,
          studentData: formContent.studentData || null,
          internshipData: formContent.internshipData || null,
          subjectsData: formContent.subjectsData || null,
          scheduleData: formContent.scheduleData || null,
          activitiesData: formContent.activitiesData || null,
          signatureData: formContent.signatureData || null,
          studentFormId: studentForm.id
        }
      })
      return studentForm;
    })

    return studentForm;
  }

  // TODO: Valid this should be made just by admin
  async uploadApprovedStudentForm(file: Express.Multer.File, data: UploadStudentFormDto) {
      // TODO: add validations for studentId and formId
      const [student, form] = await Promise.all([
        this.prismaService.student.findFirst({ where: { id: data.studentId }}),
        this.prismaService.form.findFirst({ where: { id: data.formId }})
      ])
      if (!student) {
        throw new NotFoundException('Student not found')
      }
      if (!form) {
        throw new NotFoundException('Form not found')
      }
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
        await this.s3Service.uploadApprovedObject(url, file.buffer)
        return studentForm;
      })
  
      return studentForm;
  }

  async downloadPendingForm(data: DownloadStudentFormDto) {
    const studentForm = await this.prismaService.studenForm.findUnique({
      where: {
        id: data.studentFormId,
        status: StudentFormStatus.PENDIENTE
      },
      select: {
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    const object = await this.s3Service.getPendingObject(studentForm.url)
    return {
      file: object.Body,
      filename: studentForm.url
    }
  }

  async downloadApprovedForm(data: DownloadStudentFormDto) {
    const studentForm = await this.prismaService.studenForm.findUnique({
      where: {
        id: data.studentFormId,
        status: StudentFormStatus.APROBADO
      },
      select: {
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    const object = await this.s3Service.getApprovedObject(studentForm.url)
    return {
      file: object.Body,
      filename: studentForm.url
    }
  }
}
