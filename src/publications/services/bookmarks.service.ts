import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from '../dtos/bookmarks.dto';

@Injectable()
export class BookmarksService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async create(data: CreateBookmarkDto, studentId: string) {
    const { publicationId } = data
    return this.prismaService.studentBookmarks.create({
      data: {
        studentId,
        publicationId
      }
    });
  }

  async remove(studentId: string, publicationId: string) {
    return this.prismaService.studentBookmarks.delete({
      where: {
        studentId_publicationId: {
          studentId,
          publicationId
        }
      }
    });
  }
}
