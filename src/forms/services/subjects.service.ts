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

  async create(data: CreateSubjectDto) {
    const { careerId, semester, ...rest } = data
    return this.prismaService.$transaction(async (tx) => {
      const subject = await tx.subject.create({
        data: {
          ...rest,
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
        const createdSubject = await tx.subject.create({
          data: {
            ...rest,
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
    })    
  }

  async remove(id: string) {
    return this.prismaService.subject.delete({
      where: { id }
    })      
  }
}
