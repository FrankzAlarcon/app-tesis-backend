import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { BusinessService } from '../services/business.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { CreateBusinessCovenantDto, RemoveBusinessCovenantDto } from '../dtos/business-covenant.dto';

@ApiTags('Business Covenant')
@UseGuards(AuthGuard)
@Controller('business-covenant')
export class BusinessCovenantController {
  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
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
