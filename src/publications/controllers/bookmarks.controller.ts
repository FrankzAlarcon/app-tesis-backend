import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookmarksService } from '../services/bookmarks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { CreateBookmarkDto } from '../dtos/bookmarks.dto';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { JwtPayload } from '@/global/interfaces/jwt.interface';

@ApiBearerAuth()
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
    @Req() req: any,
    @Body() data: CreateBookmarkDto
  ) {
    const user = req.user as JwtPayload
    return await this.bookmarksService.create(data, user.studentId)
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
