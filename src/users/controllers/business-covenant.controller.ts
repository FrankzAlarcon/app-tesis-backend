import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CreateBusinessCovenantDto, RemoveBusinessCovenantDto } from '../dtos/business-covenant.dto';

@ApiBearerAuth()
@ApiTags('Business Covenant')
@UseGuards(AuthGuard)
@Controller('business-covenant')
export class BusinessCovenantController {
  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createCovenantWithBusiness(
    @Body() data: CreateBusinessCovenantDto
  ) {
    return this.businessService.createCovenant(data);
  }

  @Delete()
  @Roles(Role.ADMIN)
  async removeCovenantWithBusiness(
    @Body() data: RemoveBusinessCovenantDto
  ) {
    return this.businessService.removeCovenant(data);
  }
}
