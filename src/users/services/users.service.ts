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

  async setCovenantWithBusiness() {
    // TODO: Implement this method
  }
}
