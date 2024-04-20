import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/global/guards/auth.guard';
import { Roles } from '@/global/decorators/role.decorator';
import { Role } from '@/global/enums/roles.enum';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    return this.usersService.getAll();
  }
}
