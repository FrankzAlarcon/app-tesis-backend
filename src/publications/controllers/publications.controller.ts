import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { PublicationsService } from '../services/publications.service';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { CreatePublicationDto } from '../dtos/publications.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';

@ApiTags('Publications')
@UseGuards(AuthGuard)
@Controller('publications')
export class PublicationsController {
  constructor(
    private readonly publicationsService: PublicationsService
  ) {}

  @Get('/by-business')
  @Roles(Role.BUSINESS)
  async getByBusinessId(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('User does not have a business');
    }
    return this.publicationsService.getByBusinessId(user.businessId, params);
  }

  @Get('/last')
  @Roles(Role.STUDENT)
  async getLast() {
    return this.publicationsService.getLast();
  }

  @Get(':publicationId')
  @Roles(Role.BUSINESS, Role.STUDENT)
  async getOne(
    @Param('publicationId') publicationId: string,
  ) {
    return this.publicationsService.getOne(publicationId);
  }

  @Post()
  @Roles(Role.BUSINESS)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: any,
    @Body() data: CreatePublicationDto
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('User does not have a business');
    }
    return this.publicationsService.create(data, user.businessId);
  }

}
