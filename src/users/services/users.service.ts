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
          contains: text,
          mode: 'insensitive'
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
      },
      take: 20
    });
    const students = results.filter(user => user.student !== null).map(user => ({
      id: user.id,
      name: user.name,
      studentId: user.student.id,
      shortPresentation: user.student.shortPresentation,
    }));
    const business = results.filter(user => user.business !== null).map(user => ({
      id: user.id,
      name: user.name,
      businessId: user.business.id,
      shortPresentation: user.business.shortPresentation,
    }));

    return {
      students,
      business
    };
  }

  async setCovenantWithBusiness() {
    // TODO: Implement this method
  }
}
