import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('/search/:text')
  @Roles(Role.ADMIN, Role.BUSINESS, Role.STUDENT)
  @ApiOperation({ summary: 'Search users by name' })
  async search(
    @Param('text') text: string
  ) {
    return this.usersService.search(text);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    return this.usersService.getAll();
  }
}
