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

  async getAllGroupByBusiness(params: PaginationQueryDto) {
    const forumsByBusiness = await this.paginationService.paginateGroupBy(this.prismaService.forum, {
      by: ['businessId'],
      _count: {
        id: true
      },
      _avg: {
        grade: true
      }
    }, params)
    const business = await this.prismaService.business.findMany({
      where: {
        id: {
          in: forumsByBusiness.data.map((forum: any) => forum.businessId)
        }
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })
    const mappedData = forumsByBusiness.data.map((forum: any) => {
      const businessFind = business.find((b) => b.id === forum.businessId)
      return {
        businessId: forum.businessId,
        businessName: businessFind?.name,
        businessDescription: businessFind?.description,
        count: forum._count.id,
        avgGrade: forum._avg.grade
      }
    })

    return {
      ...forumsByBusiness,
      data: mappedData
    }
  }

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
