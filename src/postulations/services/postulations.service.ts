import { PaginationService } from '@/database/services/pagination.service';
import { PrismaService } from '@/database/services/prisma.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { Injectable } from '@nestjs/common';
import { CreatePostulationDto } from '../dtos/postulations.dto';

@Injectable()
export class PostulationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async getAll(params: PaginationQueryDto) {
    return this.paginationService.paginate(
      this.prismaService.postulation,
      params
    );
  }

  async getLast() {
    return this.prismaService.postulation.findMany({
      take: 2,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        publication: {
          select: {
            id: true,
            title: true,
            modality: true,
            createdAt: true,
          }
        }
      }
    })
  }

  async getAllByStudent(studentId: string, params: PaginationQueryDto) {
    const postulations = await this.paginationService.paginate(
      this.prismaService.postulation,
      params,
      { studentId },
      {
        select: {
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
      ...postulation.publication
    }))

    return {
      ...postulations,
      data: mappedPostulations
    }
  }

  async create(data: CreatePostulationDto, studentId: string) {
    return this.prismaService.postulation.create({
      data: {
        ...data,
        studentId
      }
    });
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
