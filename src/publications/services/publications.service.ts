import { PrismaService } from '@/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from '../dtos/publications.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { PaginationService } from '@/database/services/pagination.service';
import { PostulationStatus } from '@prisma/client';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async getFeed(studentId: string, params: PaginationQueryDto) {
    const business = await this.paginationService.paginate(
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
          },
        }
      }
    )

    const studentBookmarks = await this.prismaService.studentBookmarks.findMany({
      where: { studentId, publicationId: { in: business.data.map(p => p.id)}}
    })

    const publications = business.data.map(p => {
      const bookmark = studentBookmarks.find(b => b.publicationId === p.id)
      return {
        ...p,
        bookmarked: !!bookmark
      }
    })

    return {
      ...business,
      data: publications
    }
  }

  async getAllByBusiness(businessId: string, params: PaginationQueryDto) {
    return await this.paginationService.paginate(
      this.prismaService.publication,
      params,
      { businessId },
      {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          modality: true,
          createdAt: true,
          updatedAt: true,
        }
      }
    )
  }

  async getFewByBusiness(businessId: string) {
    const publications = await this.prismaService.publication.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        modality: true,
        createdAt: true,
        updatedAt: true,
        postulations: {
          where: { status: PostulationStatus.PENDIENTE },
          select: {
            id: true
          }
        }
      },
      take: 4      
    })
    return publications.map(p => {
      const { postulations, ...rest } = p
      return {
        ...rest,
        postulationsCount: postulations.length
      }
    })
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

  async getOne(publicationId: string, studentId: string) {
    const publication = await this.prismaService.publication.findUnique({
      where: { id: publicationId },
      include:{
        business: {
          select: {
            id: true,
            name: true
          },
        },
      }
    })

    const wasAlreadyPostulated = await this.prismaService.postulation.count({
      where: { publicationId, studentId },
    })
    
    return {
      publication,
      wasAlreadyPostulated: !!wasAlreadyPostulated
    }
  }

  async getOneByBusiness(businessId: string, publicationId: string) {
    const publication = await this.prismaService.publication.findUnique({
      where: { id: publicationId, businessId }
    })
    if (!publication) {
      throw new NotFoundException('Publication not found')
    }
    const postulations = await this.prismaService.postulation.findMany({
      where: { publicationId: publication.id },
      select: {
        id: true,
        urlCV: true,
        status: true,
        student: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
              }
            },
          }
        },
        createdAt: true
      }
    })
    const mappedPostulations = postulations.map(p => {
      const { user, ...rest } = p.student
      return {
        ...p,
        student: {
          ...rest,
          ...user
        }
      }
    })

    return {
      ...publication,
      postulations: mappedPostulations
    }
  }

  async getLast() {
    return this.prismaService.publication.findMany({
      take: 2,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        modality: true,
        createdAt: true,
        business: {
          select: {
            id: true,
            name: true,
            province: true
          }
        }
      }
    })
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

      const newSkills = []
      for (const skillId of data.notRegisteredSkills) {
        const skill = await tx.skill.create({
          data: {
            name: skillId
          },
          select: {
            id: true
          }
        })
        newSkills.push(skill.id)
      }

      const allSkillsIds = [...skillsIds, ...newSkills]

      await tx.publicationSkill.createMany({
        data: allSkillsIds.map(skillId => ({
          publicationId: publication.id,
          skillId: skillId
        }))
      });

      return publication;
    })
  }
}
