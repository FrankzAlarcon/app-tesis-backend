import { PaginationService } from '@/database/services/pagination.service';
import { PrismaService } from '@/database/services/prisma.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { Injectable } from '@nestjs/common';
import { CreatePostulationDto } from '../dtos/postulations.dto';
import { v4 as uuidv4 } from 'uuid'
import { S3Service } from '@/database/services/s3.service';

@Injectable()
export class PostulationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service
  ) {}

  async getAll(params: PaginationQueryDto) {
    return this.paginationService.paginate(
      this.prismaService.postulation,
      params
    );
  }

  async getLast(studentId: string) {
    const postulations = await this.prismaService.postulation.findMany({
      take: 2,
      where: {
        studentId
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        publication: {
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
        }
      }
    })

    const mappedPostulations = postulations.map((postulation) => ({
      ...postulation.publication
    }))

    return mappedPostulations
  }

  async getAllByStudent(studentId: string, params: PaginationQueryDto) {
    const postulations = await this.paginationService.paginate(
      this.prismaService.postulation,
      params,
      { studentId },
      {
        select: {
          id: true,
          publication: {
            select: {
              id: true,
              title: true,
              modality: true,
              createdAt: true,
              business: {
                select: {
                  name: true,
                  province: true
                }
              }
            }
          }
        }
      }
    )
    const mappedPostulations = postulations.data.map((postulation) => ({
      ...postulation.publication,
      postulationId: postulation.id
    }))

    return {
      ...postulations,
      data: mappedPostulations
    }
  }

  async create(data: CreatePostulationDto, cv: Express.Multer.File, studentId: string) {
    const url = uuidv4() + `.${cv.originalname.split('.').pop()}`
    return this.prismaService.$transaction(async (tx) => {
      await this.s3Service.uploadCV(url, cv.buffer);
      return await tx.postulation.create({
        data: {
          ...data,
          urlCV: url,
          studentId
        }
      });
    })
  }

  async remove(studentId: string, postulationId: string) {
    return this.prismaService.postulation.delete({
      where: {
        id: postulationId,
        studentId
      }
    });
  }
}
