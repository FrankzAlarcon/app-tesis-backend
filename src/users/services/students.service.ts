import { AuthService } from '@/auth/services/auth.service';
import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CompleteStudentProfileDto, CreateStudentDto } from '../dtos/student.dto';
import { Role } from '@/global/enums/roles.enum';
import { PublicationsService } from '@/publications/services/publications.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { ForumService } from '@/publications/services/forum.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly publicationsService: PublicationsService,
    private readonly forumService: ForumService
  ) {}

  async getFeed(_studentId: string, params: PaginationQueryDto) {
    // TODO: get publications by student interests
    return this.publicationsService.getAll(params)
  }

  async getBookmarks(studentId: string, params: PaginationQueryDto) {
    return this.publicationsService.getAllBookmarkedByStudent(studentId, params)
  }

  async getForums(studentId: string, params: PaginationQueryDto) {
    return this.forumService.getAllByStudent(studentId, params)
  }

  async create(data: CreateStudentDto) {
    // TODO: add email validation, and those things
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email }
    })

    if (user) {
      throw new BadRequestException('Email already used')
    }

    return this.prismaService.$transaction(async (tx) => {
      const auth = await this.authService.create({
        password: data.password
      })
      const role = await tx.role.findFirst({
        where: { name: Role.STUDENT }
      })

      if (!role) {
        throw new BadRequestException('Role not found')
      }

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          roleId: role.id,
          authId: auth.id,
        }
      })

      const student = await tx.student.create({
        data: {
          userId: user.id,
        }
      })

      return student
    })
  }

  async completeProfile(id: string, data: CompleteStudentProfileDto) {
    const student = await this.prismaService.student.findUnique({
      where: { id }
    })
    if (!student) {
      throw new BadRequestException('Student not found')
    }
    return this.prismaService.student.update({
      where: { id },
      data
    })
  }
}
