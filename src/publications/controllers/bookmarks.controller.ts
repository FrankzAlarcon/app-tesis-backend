import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarksService } from '../services/bookmarks.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { CreateBookmarkDto } from '../dtos/bookmarks.dto';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';

@ApiTags('Bookmarks')
@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly bookmarksService: BookmarksService
  ) {}

  @Roles(Role.STUDENT)
  @Post('/')
  async create(
    @Body() data: CreateBookmarkDto
  ) {
    return await this.bookmarksService.create(data)
  }

  @Roles(Role.STUDENT)
  @Delete('/:studentId/:publicationId')
  async remove(
    @Param('studentId') studentId: string,
    @Param('publicationId') publicationId: string
  ) {
    return await this.bookmarksService.remove(studentId, publicationId)
  } 
}
