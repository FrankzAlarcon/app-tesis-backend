import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
// import { CreateBusinessDto } from '../dtos/business.dto';
import { AuthGuard } from '@/global/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CompleteProfileDto } from '../dtos/business.dto';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@ApiTags('Business')
@Controller('business')
@UseGuards(AuthGuard)
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
  ) {}

  // ** GET Methods **
  @Get()
  @Roles(Role.ADMIN)
  async getAll(
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getAll(params);
  }

  @Get('/short-information')
  @Roles(Role.STUDENT)
  async getAllShortInformation(
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getAllShortInformation(params);
  }

  @Get('/without-covenant')
  @Roles(Role.ADMIN)
  async getWithoutCovenant(
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getAllWithoutCovenant(params);
  }

  @Get('/short-information/:businessId')
  @Roles(Role.STUDENT)
  async getShortInformation(
    @Param('businessId') businessId: string
  ) {
    return this.businessService.getShortInformation(businessId);
  }

  @Get('/profile')
  @Roles(Role.ADMIN, Role.BUSINESS)
  async getProfile(
    @Req() req: any
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('Business not found');
    }
    return this.businessService.getProfile(user.businessId);
  }

  @Get('/publications')
  @Roles(Role.ADMIN, Role.BUSINESS)
  async getPublications(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('Business not found');
    }
    return this.businessService.getPublications(user.businessId, params);
  }

  @Get('/publications/:publicationId')
  @Roles(Role.ADMIN, Role.BUSINESS)
  async getOnePublication(
    @Req() req: any,
    @Param('publicationId') publicationId: string
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('Business not found');
    }
    return this.businessService.getOnePublication(user.businessId, publicationId);
  }

  // ** POST Methods **
  @Post('/complete-profile')
  @Roles(Role.ADMIN, Role.BUSINESS)
  async completeProfile(
    @Req() req: any,
    @Body() data: CompleteProfileDto
  ) {
    // TODO: Verify that is the business owner
    const user = req.user as JwtPayload;
    return this.businessService.completeProfile(user.sub, data);
  }
}
