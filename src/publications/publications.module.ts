import { Module } from '@nestjs/common';
import { PublicationsService } from './services/publications.service';
import { BookmarksService } from './services/bookmarks.service';
import { PublicationsController } from './controllers/publications.controller';

@Module({
  providers: [PublicationsService, BookmarksService],
  controllers: [PublicationsController],
  exports: [PublicationsService]
})
export class PublicationsModule {}
