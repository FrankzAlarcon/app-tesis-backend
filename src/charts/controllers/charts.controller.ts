import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChartsService } from '../services/charts.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';

@ApiTags('Charts')
@Controller('charts')
@UseGuards(AuthGuard)
export class ChartsController {
  constructor(
    private readonly chartsService: ChartsService
  ) {}

  @Get('/dashboard')
  async getDashboardData() {
    return this.chartsService.getDashboardData();
  }

  @Get('/download-report')
  async downloadReport() {
    return this.chartsService.downloadReport();
  }
}
