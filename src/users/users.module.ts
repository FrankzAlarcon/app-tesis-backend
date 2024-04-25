import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { StudentsService } from './services/students.service';
import { BusinessService } from './services/business.service';
import { AuthModule } from '@/auth/auth.module';
import { StudentsController } from './controllers/students.controller';
import { BusinessController } from './controllers/business.controller';
import { BusinessCovenantController } from './controllers/business-covenant.controller';
import { CovenantController } from './controllers/covenant.controller';
import { CovenantService } from './services/covenant.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController, StudentsController, BusinessController, BusinessCovenantController, CovenantController],
  providers: [UsersService, StudentsService, BusinessService, CovenantService]
})
export class UsersModule {}
