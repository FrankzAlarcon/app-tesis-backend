import { Body,
  Controller, Delete, Get, Param, Post, Query, Req, 
  UploadedFile, 
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { PostulationsService } from '../services/postulations.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { PaginationQueryDto } from '@/global/dtos/pagination-query.dto';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { CreatePostulationDto } from '../dtos/postulations.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @Get('/last')
  async getLast(
    @Req() req: any
  ) {
    const user = req.user as JwtPayload
    return await this.postulationsService.getLast(user.studentId)
  }

  @Roles(Role.STUDENT)
  @Post()
  @UseInterceptors(FileInterceptor('cv'))
  async create(
    @Req() req: any,
    @Body() data: CreatePostulationDto,
    @UploadedFile() cv: Express.Multer.File
  ) {
    const user = req.user as JwtPayload
    return await this.postulationsService.create(data, cv, user.studentId)
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
