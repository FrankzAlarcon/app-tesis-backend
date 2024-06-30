import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { PublicationsService } from '../services/publications.service';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { CreatePublicationDto } from '../dtos/publications.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Req() req: any,
    @Param('publicationId') publicationId: string,
  ) {
    const user = req.user as JwtPayload;
    return this.publicationsService.getOne(publicationId, user.studentId);
  }

  @Post()
  @Roles(Role.BUSINESS)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: any,
    @Body() data: CreatePublicationDto,
    @UploadedFile() image: Express.Multer.File | undefined
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('User does not have a business');
    }
    // return true
    return this.publicationsService.create(data, image, user.businessId);
  }

  @Delete(':publicationId')
  @Roles(Role.BUSINESS)
  async remove(
    @Req() req: any,
    @Param('publicationId') publicationId: string
  ) {
    const user = req.user as JwtPayload;
    if (!user.businessId) {
      throw new BadRequestException('User does not have a business');
    }
    return this.publicationsService.remove(publicationId, user.businessId);
  }
}
