import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PostulationsService } from '../services/postulations.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { CreatePostulationDto } from '../dtos/postulations.dto';

@ApiTags('Postulations')
@UseGuards(AuthGuard)
@Controller('postulations')
export class PostulationsController {
  constructor(
    private readonly postulationsService: PostulationsService
  ) {}

  @Roles(Role.STUDENT)
  @Get('/by-student')
  async getAllByStudent(
    @Req() req: any,
    @Query() params: PaginationQueryDto
  ) {
    const user = req.user as JwtPayload
    return await this.postulationsService.getAllByStudent(user.studentId, params)
  }

  @Roles(Role.STUDENT)
  @Post()
  async create(
    @Req() req: any,
    @Body() data: CreatePostulationDto
  ) {
    const user = req.user as JwtPayload
    return await this.postulationsService.create(data, user.studentId)
  }

  @Roles(Role.STUDENT)
  @Delete(':postulationId')
  async remove(
    @Req() req: any,
    @Param('postulationId') postulationId: string
  ) {
    const user = req.user as JwtPayload
    return await this.postulationsService.remove(user.studentId, postulationId)
  }
}
