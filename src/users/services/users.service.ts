import { PrismaService } from '@/database/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async search(text: string) {
    const results = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: text
        }
      },
      select: {
        id: true,
        name: true,
        student: {
          select: {
            id: true,
            shortPresentation: true,
          }
        },
        business: {
          select: {
            id: true,
            shortPresentation: true,
          }
        }
      }
    });
    const students = results.filter(user => user.student !== null);
    const business = results.filter(user => user.business !== null);

    return {
      students,
      business
    };
  }

  async setCovenantWithBusiness() {
    // TODO: Implement this method
  }
}
