import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { StudentsService } from './services/students.service';
import { BusinessService } from './services/business.service';
import { AuthModule } from '@/auth/auth.module';
import { StudentsController } from './controllers/students.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController, StudentsController],
  providers: [UsersService, StudentsService, BusinessService]
})
export class UsersModule {}
