import { PrismaService } from '@/database/services/prisma.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from '../dtos/publications.dto';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { PaginationService } from '@/database/services/pagination.service';
import { PostulationStatus } from '@prisma/client';
import { ConfigType } from '@nestjs/config';
import { S3Service } from '@/database/services/s3.service';
import { v4 as uuidv4 } from 'uuid'
import config from '@/config';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly s3Service: S3Service
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

    if (!publication) {
      throw new NotFoundException('Publication not found')
    }

    if (publication.imageUrl) {
      const signedUrl = await this.s3Service.getSignedUrlObject(publication.imageUrl, {}, this.configService.aws.publicationImageBucket)
      if (!signedUrl) {
        throw new NotFoundException('Publication image not found')
      }
      publication.imageUrl = signedUrl
    }


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
    if (publication.imageUrl) {
      const signedUrl = await this.s3Service.getSignedUrlObject(publication.imageUrl, {}, this.configService.aws.publicationImageBucket)
      if (!signedUrl) {
        throw new NotFoundException('Publication image not found')
      }
      publication.imageUrl = signedUrl
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

  async create(data: CreatePublicationDto, image: Express.Multer.File, businessId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const { skillsIds, remuneration, notRegisteredSkills, ...rest } = data
      const imageUrl = `${uuidv4()}.${image.mimetype.split('/')[1]}`
      await this.s3Service.uploadPublicationImage(imageUrl, image.buffer)
      const publication = await tx.publication.create({
        data: {
          ...rest,
          imageUrl,
          remuneration: remuneration ? parseFloat(remuneration) : null,
          businessId
        }
      });
      data.notRegisteredSkills = notRegisteredSkills.filter(skill => skill.trim() !== '')
      const checkSkills = await tx.skill.findMany({
        where: {
          name: { in: data.notRegisteredSkills }
        },
        select: {
          id: true,
          name: true
        }
      })
      if (checkSkills.length > 0) {
        data.notRegisteredSkills = data.notRegisteredSkills.filter(skillName => {
          const found = checkSkills.find(skill => skill.name === skillName)
          return !found
        })
      }
      const newSkills = []
      for (const skillName of data.notRegisteredSkills) {
        const skill = await tx.skill.create({
          data: {
            name: skillName
          },
          select: {
            id: true
          },
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
