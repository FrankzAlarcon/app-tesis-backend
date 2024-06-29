import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateForumDto } from '../dtos/forum.dto';
import { PaginationService } from '@/database/services/pagination.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { S3Service } from '@/database/services/s3.service';

@Injectable()
export class ForumService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service
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
        shortPresentation: true,
        imageUrl: true
      }
    })
    const mappedData = await Promise.all(forumsByBusiness.data.map(async (forum: any) => {
      const businessFind = business.find((b) => b.id === forum.businessId)
      if (businessFind?.imageUrl) {
        businessFind.imageUrl = await this.s3Service.getSignedUrlObject(businessFind.imageUrl)
      }
      return {
        businessId: forum.businessId,
        businessName: businessFind?.name,
        businessDescription: businessFind?.shortPresentation,
        businessImageUrl: businessFind?.imageUrl,
        count: forum._count.id,
        avgGrade: forum._avg.grade
      }
    }))

    return {
      ...forumsByBusiness,
      data: mappedData
    }
  }

  async getAllByBusiness(businessId: string, params: PaginationQueryDto) {
    const response = await this.paginationService.paginate(
      this.prismaService.forum,
      params,
      { businessId },
      {
        include: {
          student: {
            select: {
              id: true,
              imageUrl: true,
              user: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      }	
    )
    const data = await Promise.all(response.data.map(async (forum) => {
      if (forum.student.imageUrl) {
        forum.student.imageUrl = await this.s3Service.getSignedUrlObject(forum.student.imageUrl)
      }
      return forum
    }))

    return {
      ...response,
      data
    }
  }

  async getAllByStudent(studentId: string, params: PaginationQueryDto) {
    const response = await this.paginationService.paginate(
      this.prismaService.forum,
      params,
      { studentId },
      {
        include: {
          student: {
            select: {
              id: true,
              imageUrl: true,
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
    const data = await Promise.all(response.data.map(async (forum) => {
      if (forum.student.imageUrl) {
        forum.student.imageUrl = await this.s3Service.getSignedUrlObject(forum.student.imageUrl)
      }
      return forum
    }))

    return {
      ...response,
      data
    }
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
