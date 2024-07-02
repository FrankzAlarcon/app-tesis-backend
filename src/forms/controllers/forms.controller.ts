import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormsService } from '../services/forms.service';
import { CreateFormDto } from '../dtos/forms.dto';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Response } from 'express';
import { FormContentDto } from '../dtos/form-content.dto';

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

  @Post('/faa119/pdf')
  @Roles(Role.ADMIN, Role.STUDENT)
  async generatePdf(
    @Body() data: FormContentDto,
    @Res() response: Response
  ) {
    const generatedPdf = await this.formsService.generateFaa119Pdf(data)
    response.setHeader('Content-Type', 'application/pdf')
    generatedPdf.info.Title = 'F_AA_119_FrankzAlarcon'
    generatedPdf.pipe(response)
    generatedPdf.end()
  }

}
