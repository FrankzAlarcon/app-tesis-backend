import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectsService: ProjectsService
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
  
          user: {
            select: {
              email: true,
              name: true,
            }
          }
        }
      }),
      this.projectsService.getByStudent(studentId)
      // Get certifications
    ])

    const [student, projects] = promises;
    const {user, ...rest} = student
    return {
      ...user,
      ...rest,
      projects,
      certifications: []
    }
  }
}
