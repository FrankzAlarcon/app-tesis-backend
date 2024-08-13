import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ChartsService } from '../services/charts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Charts')
@Controller('charts')
@UseGuards(AuthGuard)
export class ChartsController {
  constructor(
    private readonly chartsService: ChartsService
  ) {}

  @Roles(Role.ADMIN)
  @Get('/dashboard')
  async getDashboardData() {
    return this.chartsService.getDashboardData();
  }

  @Roles(Role.ADMIN)
  @Get('/download-report')
  async downloadReport(
    @Res() response: Response
  ) {
    const generatedPdf = await this.chartsService.downloadReport();
    response.setHeader('Content-Type', 'application/pdf')
    generatedPdf.info.Title = 'F_AA_119_FrankzAlarcon'
    generatedPdf.pipe(response)
    generatedPdf.end()
  }
}
