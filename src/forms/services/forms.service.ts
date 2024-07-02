import { S3Service } from '@/database/services/s3.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/services/prisma.service';
import { CreateFormDto } from '../dtos/forms.dto';
import { PrinterService } from '@/printer/services/printer.service';
import { getFormFa119Template } from '@/printer/templates/form-fa119';
import { FormContentDto } from '../dtos/form-content.dto';

export interface F_AA_119 {
  career: string
  modality: string
  businessData: any
  studentData: any
  internshipData: any
  subjectsData: any
  scheduleData: any
  activitiesData: any
  signatureData: any
}

@Injectable()
export class FormsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService,
    private readonly printerService: PrinterService
  ) {}

  async create(data: CreateFormDto) {
    return this.prismaService.form.create({
      data
    });
  }

  async generateFaa119Pdf(data: FormContentDto) {
    const subjects = await this.prismaService.subject.findMany({
      where: {
        id: {
          in: data.subjectsData.subjects
        }
      },
      select: {
        name: true
      }
    })
    data.subjectsData.subjects = subjects.map(subject => subject.name).join(', ')
    const docDefinition = getFormFa119Template(data)
    const doc = this.printerService.createFaa199FormPdf(docDefinition)
    return doc
  }
}
