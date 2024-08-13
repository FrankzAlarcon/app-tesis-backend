import { Module } from '@nestjs/common';
import { ChartsService } from './services/charts.service';
import { ChartsController } from './controllers/charts.controller';
import { PrinterModule } from '@/printer/printer.module';

@Module({
  providers: [ChartsService],
  controllers: [ChartsController],
  imports: [PrinterModule],
})
export class ChartsModule {}
