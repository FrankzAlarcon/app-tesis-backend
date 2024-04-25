import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CompleteProfileDto, CreateBusinessDto } from '../dtos/business.dto';
import { AuthService } from '@/auth/services/auth.service';
import { Role } from '@/global/enums/roles.enum';
import { v4 as uuidv4 } from 'uuid';
import { PaginationService } from '@/database/services/pagination.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { CreateBusinessCovenantDto, RemoveBusinessCovenantDto } from '../dtos/business-covenant.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly paginationService: PaginationService
  ) {}

  async getAll(params: PaginationQueryDto) {
    return this.paginationService.paginate(this.prismaService.business, params)
  }

  async getAllWithoutCovenant(params: PaginationQueryDto) {
    return this.paginationService.paginate(this.prismaService.business, params, { hasCovenant: false })
  }

  // This method is used on
  async create(data: CreateBusinessDto) {
    // TODO: add email validation, and those things
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email }
    })

    if (user) {
      throw new BadRequestException('Email already used')
    }

    return this.prismaService.$transaction(async (tx) => {
      const auth = await this.authService.create({
        password: data.password
      })
      const role = await tx.role.findFirst({
        where: { name: Role.BUSINESS }
      })

      if (!role) {
        throw new BadRequestException('Role not found')
      }

      const user = await tx.user.create({
        data: {
          // this name is the contact name or owner name
          name: data.name,
          email: data.email,
          roleId: role.id,
          authId: auth.id,
        }
      })
      const business = await tx.business.create({
        data: {
          userId: user.id,
          code: uuidv4(),
          name: data.businessName,
          hasCovenant: false
        }
      })

      return business
    })
  }

  // TODO: add methods for complete profile information
  async completeProfile(userId: string, data: CompleteProfileDto) {
    const business = await this.prismaService.business.findFirst({
      where: { userId: userId},
      select: { id: true }
    })

    if (!business) {
      throw new BadRequestException('Business not found')
    }

    return this.prismaService.business.update({
      where: { id: business.id },
      data: {
        province: data.province,
        city: data.city,
        phone: data.phone,
        description: data.description
      }
    })
  }

  async createCovenant(data: CreateBusinessCovenantDto) {
    const business = await this.prismaService.business.findFirst({
      where: { id: data.businessId }
    })

    if (!business) {
      throw new BadRequestException('Business not found')
    }

    const covenant = await this.prismaService.covenant.findUnique({
      where: { type: data.covenantType },
      select: { id: true }
    })

    if (!covenant) {
      throw new BadRequestException('Covenant not found')
    }

    return this.prismaService.$transaction(async (tx) => {
      await tx.businessCovenant.create({
        data: {
          startDate: data.startDate,
          endDate: data.endDate,
          businessId: business.id,
          covenantId: covenant.id
        }
      })
      const businessWithCovenant = await tx.business.update({
        where: { id: business.id },
        data: { hasCovenant: true }
      })

      return businessWithCovenant
    })
  }

  async removeCovenant(data: RemoveBusinessCovenantDto) {
    const business = await this.prismaService.business.findFirst({
      where: { id: data.businessId }
    })

    if (!business) {
      throw new BadRequestException('Business not found')
    }

    return this.prismaService.$transaction(async (tx) => {
      await tx.businessCovenant.delete({
        where: { businessId: business.id }
      })
      const businessWithoutCovenant = await tx.business.update({
        where: { id: business.id },
        data: { hasCovenant: false }
      })

      return businessWithoutCovenant
    })
  }
}
