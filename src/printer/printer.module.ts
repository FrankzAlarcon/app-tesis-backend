import { Module } from '@nestjs/common';
import { PrinterService } from './services/printer.service';

@Module({
  providers: [PrinterService],
  exports: [PrinterService]
})
export class PrinterModule {}
