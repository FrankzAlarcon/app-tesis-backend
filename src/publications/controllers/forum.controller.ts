import { AuthGuard } from '@/global/guards/auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForumService } from '../services/forum.service';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { CreateForumDto } from '../dtos/forum.dto';

@ApiBearerAuth()
@ApiTags('Forum')
@UseGuards(AuthGuard)
@Controller('forum')
export class ForumController {
  constructor(
    private readonly forumService: ForumService
  ) {}

  @Roles(Role.STUDENT)
  @Get('/by-business/:businessId')
  async getByBusinessId(
    @Param('businessId') businessId: string,
    @Query() params: PaginationQueryDto
  ) {
    return this.forumService.getAllByBusiness(businessId, params);
  }

  @Roles(Role.STUDENT)
  @Get('/by-student')
  async getByStudentId(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload;
    return this.forumService.getAllByStudent(user.studentId, params);
  }

  @Roles(Role.STUDENT, Role.BUSINESS)
  @Get('/group-by-business')
  async groupByBusiness(
    @Query() params: PaginationQueryDto
  ) {
    return this.forumService.getAllGroupByBusiness(params);
  }

  @Roles(Role.STUDENT)
  @Post('/')
  async create(
    @Req() req: any,
    @Body() data: CreateForumDto
  ) {
    const user = req.user as JwtPayload;
    return this.forumService.create(data, user.studentId);
  }

  @Roles(Role.STUDENT)
  @Delete('/:forumId')
  async remove(
    @Req() req: any,
    @Param('forumId') forumId: string
  ) {
    const user = req.user as JwtPayload;
    return this.forumService.remove(forumId, user.studentId);
  }
}
