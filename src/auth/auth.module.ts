import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { AuthService } from './services/auth.service';
import { RolesController } from './controllers/roles.controller';

@Module({
  providers: [RolesService, AuthService],
  exports: [RolesService, AuthService],
  controllers: [RolesController]
})
export class AuthModule {}
