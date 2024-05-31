import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from '../dtos/publications.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { PaginationService } from '@/database/services/pagination.service';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async getAll(params: PaginationQueryDto) {
    return await this.paginationService.paginate(
      this.prismaService.publication,
      params,
      {}, 
      {
        include:{
          business: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    )
  }

  async getAllBookmarkedByStudent(studentId: string, params: PaginationQueryDto) {
    return await this.paginationService.paginate(
      this.prismaService.studentBookmarks,
      params,
      { studentId },
      {
        select: {
          id: true,
          studentId: true,
          publicationId: true,
          publication: {
            select: {
              id: true,
              description: true,
              modality: true,
              business: {
                select: {
                  id: true,
                  name: true,
                }
              },
              createdAt: true,
              updatedAt: true
            }
          }
        }
      }
    )
  }

  async getByBusinessId(businessId: string, params: PaginationQueryDto) {
    return await this.paginationService.paginate(this.prismaService.publication, params, { businessId })
  }

  async create(data: CreatePublicationDto, businessId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const { skillsIds, remuneration, ...rest } = data
      const publication = await tx.publication.create({
        data: {
          ...rest,
          remuneration: remuneration ? parseFloat(remuneration) : null,
          businessId
        }
      });

      await tx.publicationSkill.createMany({
        data: skillsIds.map(skillId => ({
          publicationId: publication.id,
          skillId: skillId
        }))
      });

      return publication;
    })
  }
}
