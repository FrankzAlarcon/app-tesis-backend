import { Module } from '@nestjs/common';
import { PostulationsService } from './services/postulations.service';
import { PostulationsController } from './controllers/postulations.controller';

@Module({
  providers: [PostulationsService],
  controllers: [PostulationsController]
})
export class PostulationsModule {}
