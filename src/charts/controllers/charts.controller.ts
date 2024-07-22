import { Controller, Get } from '@nestjs/common';
import { ChartsService } from '../services/charts.service';

@Controller('charts')
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
