import { Module } from '@nestjs/common';
import { PublicationsService } from './services/publications.service';
import { BookmarksService } from './services/bookmarks.service';
import { PublicationsController } from './controllers/publications.controller';
import { BookmarksController } from './controllers/bookmarks.controller';
import { ForumService } from './services/forum.service';
import { ForumController } from './controllers/forum.controller';
import { PostulationsModule } from '@/postulations/postulations.module';

@Module({
  providers: [PublicationsService, BookmarksService, ForumService],
  controllers: [PublicationsController, BookmarksController, ForumController],
  imports:[PostulationsModule],
  exports: [PublicationsService, ForumService]
})
export class PublicationsModule {}
