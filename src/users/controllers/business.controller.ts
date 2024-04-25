import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
// import { CreateBusinessDto } from '../dtos/business.dto';
import { AuthGuard } from '@/global/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CompleteProfileDto } from '../dtos/business.dto';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Business')
@Controller('business')
@UseGuards(AuthGuard)
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly usersService: UsersService
  ) {}

  // async create(
  //   @Body() data: CreateBusinessDto
  // ) {
  //   return this.businessService.create(data);
  // }

  @Get()
  @Roles(Role.ADMIN)
  async getAll(
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getAll(params);
  }

  @Get('/without-covenant')
  @Roles(Role.ADMIN)
  async getWithoutCovenant(
    @Query() params: PaginationQueryDto
  ) {
    return this.businessService.getAllWithoutCovenant(params);
  }

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
