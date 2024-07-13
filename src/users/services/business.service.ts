import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CompleteProfileDto, CreateBusinessDto } from '../dtos/business.dto';
import { AuthService } from '@/auth/services/auth.service';
import { Role } from '@/global/enums/roles.enum';
import { v4 as uuidv4 } from 'uuid';
import { PaginationService } from '@/database/services/pagination.service';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { CreateBusinessCovenantDto, RemoveBusinessCovenantDto } from '../dtos/business-covenant.dto';
import { PublicationsService } from '@/publications/services/publications.service';
import { S3Service } from '@/database/services/s3.service';

@Injectable()
export class BusinessService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly publicationService: PublicationsService,
    private readonly paginationService: PaginationService,
    private readonly s3Service: S3Service
  ) {}

  async getAll(params: PaginationQueryDto) {
    const business = await this.paginationService.paginate(this.prismaService.business, params, {})
    const mappedBusiness = await Promise.all(business.data.map(async (b: any) => {
      if (b.imageUrl) {
        b.imageUrl = await this.s3Service.getSignedUrlObject(b.imageUrl)
      }
      return b
    }))

    return {
      ...business,
      data: mappedBusiness
    }
  }

  async getAllShortInformation(params: PaginationQueryDto) {
    return this.paginationService.paginate(
      this.prismaService.business,
      params,
      {},
      {select: { id: true, name: true } }
    )
  }

  
  async getAllWithoutCovenant(params: PaginationQueryDto) {
    return this.paginationService.paginate(this.prismaService.business, params, { hasCovenant: false })
  }
  
  async getAllForumByBusiness(businessId: string, params: PaginationQueryDto) {
    return this.paginationService.paginate(this.prismaService.forum, params, { businessId })
  }

  
  async getShortInformation(businessId: string) {
    return this.prismaService.business.findUnique({
      where: { id: businessId },
      select: { id: true, name: true }
    })
  }
  
  async getProfile(businessId: string) {
    const promises = await Promise.all([
      this.prismaService.business.findUnique({
        where: { id: businessId },
        select: {
          id: true,
          name: true,
          province: true,
          city: true,
          description: true,
          shortPresentation: true,
          imageUrl: true,
        }
      }),
      this.publicationService.getFewByBusiness(businessId)
    ])
    const [business, publications] = promises
    if (!business) {
      throw new BadRequestException('Business not found')
    }
    if (business.imageUrl) {
      business.imageUrl = await this.s3Service.getSignedUrlObject(business.imageUrl)
    }
    return {
      ...business,
      publications
    }
  }

  async getShortProfile(businessId: string) {
    const business = await this.prismaService.business.findUnique({
      where: { id: businessId },
      select: {
        id: true,
        name: true,
        province: true,
        shortPresentation: true,
        imageUrl: true,
        city: true,
        phone: true
      }
    })

    if (!business) {
      throw new BadRequestException('Business not found')
    }

    if (business.imageUrl) {
      business.imageUrl = await this.s3Service.getSignedUrlObject(business.imageUrl)
    }

    return business
  }

  async getPublicProfile(businessId: string) {
    return this.getProfile(businessId)
  }

  async getPublications(businessId: string, params: PaginationQueryDto) {
    return this.publicationService.getAllByBusiness(businessId, params)
  }

  async getOnePublication(businessId: string, publicationId: string) {
    // TODO: add recommended students
    return this.publicationService.getOneByBusiness(businessId, publicationId)
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
          name: data.name,
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
        description: data.description,
        shortPresentation: data.shortPresentation
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

  async updateImageProfile(businessId: string, image: Express.Multer.File) {
    const imageUrl = `${uuidv4()}.${image.mimetype.split('/')[1]}`
    return this.prismaService.$transaction(async () => {
      await this.s3Service.uploadProfileImage(imageUrl, image.buffer)
      const business = await this.prismaService.business.findUnique({
        where: { id: businessId },
        select: {
          id: true,
          imageUrl: true
        }
      })

      if (!business) {
        throw new BadRequestException('Business not found')
      }

      if (business.imageUrl) {
        await this.s3Service.removeProfileImage(business.imageUrl)
      }

      return this.prismaService.business.update({
        where: { id: businessId },
        data: { imageUrl }
      })
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
