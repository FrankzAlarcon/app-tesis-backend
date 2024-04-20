import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormsService } from '../services/forms.service';
import { CreateFormDto } from '../dtos/forms.dto';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';

@ApiTags('Forms')
@UseGuards(AuthGuard)
@Controller('forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() data: CreateFormDto
  ) {
    return await this.formsService.create(data)
  }

}
