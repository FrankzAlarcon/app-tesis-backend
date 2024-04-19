import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormsService } from '../services/forms.service';
import { CreateFormDto } from '../dtos/forms.dto';

@ApiTags('Forms')
@Controller('forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService
  ) {}

  @Post()
  async create(
    @Body() data: CreateFormDto
  ) {
    return await this.formsService.create(data)
  }

}
