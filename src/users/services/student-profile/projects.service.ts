import { PrismaService } from '@/database/services/prisma.service';
import { UserProject } from '@/global/interfaces/projects.interface';
import { CreateProjectDto } from '@/users/dtos/projects.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getByStudent(studentId: string) {
    if (!studentId) {
      throw new BadRequestException('User not found')
    }
    return this.prismaService.project.findMany({
      where: { studentId },      
      include: {
        projectSkills: {
          select: {
            skill: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    }).then(this.mapProjectSkills);
  }

  async create(data: CreateProjectDto, studentId: string) {
    if (!studentId) {
      throw new BadRequestException('User not found')
    }
    const student = await this.prismaService.student.findUnique({
      where: { id: studentId },
      select: { id: true }
    })
    if (!student) {
      throw new BadRequestException('Student not found')
    }
    const { skillsIds, ...rest } = data;
    return this.prismaService.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          ...rest,
          studentId: student.id
        }
      });

      const projectSkills = skillsIds.map(skillId => {
        return {
          projectId: project.id,
          skillId
        }
      }
      );

      await tx.projectSkill.createMany({
        data: projectSkills
      });

      return project;
    })
  }

  private mapProjectSkills(data: any): UserProject[] {
    return data.map((item: any) => {
      return {
        ...item,
        projectSkills: item.projectSkills.map((skill: any) => {
          return {
            id: skill.skill.id,
            name: skill.skill.name
          }
        })
      }
    })
  }
}
