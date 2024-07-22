import { Module } from '@nestjs/common';
import { ChartsService } from './services/charts.service';
import { ChartsController } from './controllers/charts.controller';

@Module({
  providers: [ChartsService],
  controllers: [ChartsController]
})
export class ChartsModule {}
