import { PrismaService } from '@/database/services/prisma.service';
import { S3Service } from '@/database/services/s3.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { DownloadStudentFormDto, UploadApprovedStudentForm, UploadPendingStudentForm, UploadStudentFormDto } from '../dtos/student-form.dto';
import { statusToBucket, StudentFormBucket, StudentFormStatus } from '@/global/enums/student-forms.enum';
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

  async getStudentForms(status: string, params: PaginationQueryDto) {
    if (status !== 'all') {
      const isValidStatus = Object.values(StudentFormStatus).includes(status as StudentFormStatus)
      if (!isValidStatus) {
        throw new NotFoundException('Invalid status')
      }
    }
    this.prismaService.studenForm.findMany({
      include: {
        student: {
          select: {
            id: true,
            user: {
              select: {
                name: true
              }
            },
          }
        },
        form: {
          select: {
            code: true,
          }
        }
      }
    })
    const studentForms = await this.paginationService.paginate(
      this.prismaService.studenForm,
      params,
      {
        status: status === 'all' ? undefined : status
      },
      {
        include: {
          student: {
            select: {
              id: true,
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          form: {
            select: {
              code: true,
            }
          }
        }
      }
    )
    const mappedData = studentForms.data.map((studentForm) => {
      const { student, form, ...rest } = studentForm
      return ({
        ...rest,
        studentId: student.id,
        studentName: student.user.name,
        formCode: form.code,
      })
    })

    return {
      ...studentForms,
      data: mappedData
    }
  }

  async getPendingFormsByStudentId(studentId: string) {
    const studentForms = await this.prismaService.studenForm.findMany({
      where: {
        studentId,
      }
    })
    return studentForms
  }

  async getStudentFormInfo(
    data: GetStudentInfoByFormDto,
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

  async getStudentForm(studentFormId: string, status: string) {
    const studentForm = await this.prismaService.studenForm.findFirst({
      where: {
        id: studentFormId,
        status
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    const isValidStatus = Object.values(StudentFormStatus).includes(status as StudentFormStatus)
    if (!isValidStatus) {
      throw new NotFoundException('Invalid status')
    }

    try {
      console.log(statusToBucket[status as StudentFormStatus], studentForm.url)
      const object = await this.s3Service.getFormObject({
        filename: studentForm.url,
        status: statusToBucket[status as StudentFormStatus]
      })
      return {
        file: object.Body,
        filename: studentForm.url
      }
    } catch (error) {
      throw new NotFoundException('File not found')
    }
  }

  async uploadEmittedStudentForm(file: Express.Multer.File, data: UploadStudentFormDto) {
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
      await this.s3Service.uploadFormObject({
        filename: url,
        file: file.buffer,
        status: StudentFormBucket.EMITTED
      })
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

  async uploadPendingStudentForm(file: Express.Multer.File, data: UploadPendingStudentForm, studentId: string) {
    const studentForm = await this.prismaService.studenForm.findFirst({
      where: {
        studentId,
        url: data.url,
        status: StudentFormStatus.EMITIDO
      },
      select: {
        id: true,
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    await this.s3Service.uploadFormObject({
      filename: studentForm.url,
      file: file.buffer,
      status: StudentFormBucket.PENDING
    })
    const updatedStudentForm = await this.prismaService.studenForm.update({
      where: {
        id: studentForm.id
      },
      data: {
        status: StudentFormStatus.PENDIENTE,
        url: data.url
      }
    })
    return updatedStudentForm
  }

  async uploadApprovedStudentForm(file: Express.Multer.File, data: UploadApprovedStudentForm) {
    const studentForm = await this.prismaService.studenForm.findFirst({
      where: {
        studentId: data.studentFormId,
        url: data.url,
        status: StudentFormStatus.PENDIENTE
      },
      select: {
        id: true,
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    await this.s3Service.uploadFormObject({
      filename: studentForm.url,
      file: file.buffer,
      status: StudentFormBucket.APPROVED
    })
    const updatedStudentForm = await this.prismaService.studenForm.update({
      where: {
        id: studentForm.id
      },
      data: {
        status: StudentFormStatus.APROBADO,
        url: data.url
      }
    })
    return updatedStudentForm
  }

  async uploadRepprovedStudentForm(file: Express.Multer.File, data: UploadApprovedStudentForm) {
    const studentForm = await this.prismaService.studenForm.findFirst({
      where: {
        studentId: data.studentFormId,
        url: data.url,
        status: StudentFormStatus.PENDIENTE
      },
      select: {
        id: true,
        url: true
      }
    })
    if (!studentForm) {
      throw new NotFoundException('Student form not found')
    }
    await this.s3Service.uploadFormObject({
      filename: studentForm.url,
      file: file.buffer,
      status: StudentFormBucket.REPPROVED
    })
    const updatedStudentForm = await this.prismaService.studenForm.update({
      where: {
        id: studentForm.id
      },
      data: {
        status: StudentFormStatus.RECHAZADO,
        url: data.url
      }
    })
    return updatedStudentForm
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
