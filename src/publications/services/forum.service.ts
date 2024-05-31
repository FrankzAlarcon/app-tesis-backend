import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateForumDto } from '../dtos/forum.dto';
import { PaginationService } from '@/database/services/pagination.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@Injectable()
export class ForumService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async getAllByBusiness(businessId: string, params: PaginationQueryDto) {
    return await this.paginationService.paginate(
      this.prismaService.forum,
      params,
      { businessId },
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
          }
        }
      }	
    )
  }

  async getAllByStudent(studentId: string, params: PaginationQueryDto) {
    return await this.paginationService.paginate(
      this.prismaService.forum,
      params,
      { studentId },
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
          }
        }
      }	
    )
  }

  async create(data: CreateForumDto, studentId: string) {
    return await this.prismaService.forum.create({
      data: {
        ...data,
        studentId
      }
    });
  }

  async remove(forumId: string, studentId: string) {
    return await this.prismaService.forum.delete({
      where: {
        id: forumId,
        studentId
      }
    });
  }
}
