import { PrismaService } from '@/database/services/prisma.service';
import { CreateCertificationDto } from '@/users/dtos/certifications.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CertificationsService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getByStudent(studentId: string) {
    return this.prismaService.certification.findMany({
      where: { studentId }
    })
  }

  async create(data: CreateCertificationDto, studentId: string) {
    const student = await this.prismaService.student.findUnique({
      where: { id: studentId }
    })

    if (!student) {
      throw new NotFoundException('Student not found')
    }

    return this.prismaService.certification.create({
      data: {
        ...data,
        studentId
      }
    })
  }
}
