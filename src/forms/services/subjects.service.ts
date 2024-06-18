import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '../dtos/subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getAll() {
    return this.prismaService.subject.findMany()
  }

  async getAllOrdered(careerId: string) {
    const subjects = await this.prismaService.subject.findMany({
      include: {
        careersSubjects: {
          where: {
            careerId
          },
          select: {
            semester: true,
          }
        }
      }
    })
    const mappedSubjects = subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      code: subject.code,
      semester: subject.careersSubjects[0].semester
    }))

    //ordered by semester in array of arrays
    const orderedSubjects = mappedSubjects.reduce((acc, subject) => {
      const index = subject.semester - 1
      if (!acc[index]) {
        acc[index] = []
      }
      acc[index].push(subject)
      return acc
    }, [])


    return orderedSubjects
  }

  async create(data: CreateSubjectDto) {
    const { careerId, semester, ...rest } = data
    return this.prismaService.$transaction(async (tx) => {
      const subject = await tx.subject.create({
        data: {
          name: rest.name,
          code: rest.code,
        }
      })
      await tx.subjectCareer.create({
        data: {
            semester,
            careerId,
            subjectId: subject.id,
          }
      })
      return subject
    })
  }

  async createMany(data: CreateSubjectDto[]) {
    return this.prismaService.$transaction(async (tx) => {
      const subjects = await Promise.all(data.map(async (subject) => {
        const { careerId, semester, ...rest } = subject
        console.log('subject', subject)
        const createdSubject = await tx.subject.create({
          data: {
            name: rest.name,
            code: rest.code,
          }
        })
        await tx.subjectCareer.create({
          data: {
              semester,
              careerId,
              subjectId: createdSubject.id,
            }
        })
        return createdSubject
      })
      )

      return subjects
    }, {
      timeout: 1000 * 60 * 2
    })    
  }

  async remove(id: string) {
    return this.prismaService.subject.delete({
      where: { id }
    })      
  }
}
