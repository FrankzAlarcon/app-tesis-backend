import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarksService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}
}
