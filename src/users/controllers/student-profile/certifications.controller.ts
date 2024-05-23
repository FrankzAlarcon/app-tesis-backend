import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';
import { AuthGuard } from '@/global/guards/auth.guard';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { CreateCertificationDto } from '@/users/dtos/certifications.dto';
import { CertificationsService } from '@/users/services/student-profile/certifications.service';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Certifications') 
@UseGuards(AuthGuard)
@Controller('certifications')
export class CertificationsController {
  constructor(
    private readonly certificationsService: CertificationsService
  ) {}

  @Get('/by-student')
  @Roles(Role.STUDENT)
  async getByStudent(
    @Req() req: any,
  ) {
    const user = req.user as JwtPayload;
    return this.certificationsService.getByStudent(user.studentId);
  }

  @Post()
  @Roles(Role.STUDENT)
  async create(
    @Req() req: any,
    @Body() data: CreateCertificationDto
  ) {
    const user = req.user as JwtPayload;
    return this.certificationsService.create(data, user.studentId);
  }

  @Delete(':id')
  @Roles(Role.STUDENT)
  async remove(
    @Req() req: any,
    @Param('id') id: string 
  ) {
    const user = req.user as JwtPayload;
    return this.certificationsService.remove(id, user.studentId);
  }
}
