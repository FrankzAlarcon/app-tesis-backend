import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CovenantService } from '../services/covenant.service';
import { CreateCovenantDto } from '../dtos/covenant.dto';

@ApiBearerAuth()
@ApiTags('Covenant')
@Roles(Role.ADMIN)
@Controller('covenant')
export class CovenantController {
  constructor(
    private readonly covenantService: CovenantService
  ) {}

  @Get()
  async getAll() {
    return this.covenantService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateCovenantDto
  ) {
    return this.covenantService.create(data);
  }
}
