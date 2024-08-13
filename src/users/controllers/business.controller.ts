import { BadRequestException, Body, Controller, Get, Param, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
// import { CreateBusinessDto } from '../dtos/business.dto';
import { AuthGuard } from '@/global/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CompleteProfileDto } from '../dtos/business.dto';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiBearerAuth()
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

  @Get('/short-profile')
  @Roles(Role.BUSINESS)
  async getShortProfile(
    @Req() req: any
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('Business not found');
    }
    return this.businessService.getShortProfile(user.businessId);
  }

  @Get('/public/profile/:businessId')
  @Roles(Role.STUDENT, Role.BUSINESS, Role.ADMIN)
  async getPublicProfile(
    @Param('businessId') businessId: string
  ) {
    return this.businessService.getPublicProfile(businessId);
  }

  @Get('/public/short-profile/:businessId')
  @Roles(Role.STUDENT, Role.BUSINESS, Role.ADMIN)
  async getPublicShortProfile(
    @Param('businessId') businessId: string
  ) {
    return this.businessService.getShortProfile(businessId);
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

  @Get('/public/publications/:businessId')
  @Roles(Role.STUDENT, Role.ADMIN, Role.BUSINESS)
  async getPublicPublications(
    @Param('businessId') businessId: string,
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getPublications(businessId, params);
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
  @Put('/complete-profile')
  @Roles(Role.ADMIN, Role.BUSINESS)
  async completeProfile(
    @Req() req: any,
    @Body() data: CompleteProfileDto
  ) {
    // TODO: Verify that is the business owner
    const user = req.user as JwtPayload;
    return this.businessService.completeProfile(user.sub, data);
  }

  @Put('/update-image-profile')
  @Roles(Role.BUSINESS)
  @UseInterceptors(FileInterceptor('image'))
  async updateImageProfile(
    @Req() req: any,
    @UploadedFile() image: Express.Multer.File
  ) {
    const user = req.user as JwtPayload;
    return this.businessService.updateImageProfile(user.businessId, image);
  }
}
