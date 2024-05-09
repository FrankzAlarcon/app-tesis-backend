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
import { ProfileService } from './services/student-profile/profile.service';
import { ProjectsService } from './services/student-profile/projects.service';
import { SkillsService } from './services/student-profile/skills.service';
import { ProjectsController } from './controllers/student-profile/projects.controller';
import { SkillsController } from './controllers/student-profile/skills.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    UsersController,
    StudentsController,
    BusinessController,
    BusinessCovenantController,
    CovenantController,
    SkillsController,
    ProjectsController
  ],
  providers: [
    UsersService,
    StudentsService,
    BusinessService,
    CovenantService,
    ProfileService,
    ProjectsService,
    SkillsService
  ]
})
export class UsersModule {}
