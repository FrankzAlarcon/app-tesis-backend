import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CertificationsService } from './certifications.service';
import { S3Service } from '@/database/services/s3.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectsService: ProjectsService,
    private readonly certificationsService: CertificationsService,
    private readonly s3Service: S3Service
  ){ }

  //TODO: Add Registro de Practas info
  async studentProfileInfo(studentId: string) {
    // get student info, projects, curriculum, certifications, etc
    const promises = await Promise.all([
      this.prismaService.student.findUnique({
        where: { id: studentId},
        select: {
          id: true,
          shortPresentation: true,
          description: true,
          faculty: true,
          ira: true,
          imageUrl: true,
          user: {
            select: {
              email: true,
              name: true,
            }
          }
        }
      }),
      this.projectsService.getByStudent(studentId),
      this.certificationsService.getByStudent(studentId)
    ])
    const [student, projects, certifications] = promises;
    const {user, ...rest} = student
    if (student.imageUrl) {
      rest.imageUrl = await this.s3Service.getSignedUrlObject(student.imageUrl)
    }
    return {
      ...user,
      ...rest,
      projects,
      certifications
    }
  }

  async getShortProfile(studentId: string) {
    const promises = await Promise.all([
      this.prismaService.student.findUnique({
        where: { id: studentId },
        select: {
          id: true,
          faculty: true,
          ira: true,
          shortPresentation: true,
          imageUrl: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }),
      this.prismaService.postulation.count({
        where: { studentId }
      })
    ])
    const [student, postulationsCount] = promises
    if (student.imageUrl) {
      student.imageUrl = await this.s3Service.getSignedUrlObject(student.imageUrl)
    }
    const {user, ...rest} = student
    // TODO: Add reocmendations
    const recommendedCount = 0
    return {
      ...rest,
      ...user,
      postulationsCount,
      recommendedCount
    }
  }
}
