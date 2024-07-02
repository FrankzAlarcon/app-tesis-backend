import { Module } from '@nestjs/common';
import { FormsService } from './services/forms.service';
import { FormsController } from './controllers/forms.controller';
import { StudentFormService } from './services/student-form.service';
import { StudentFormController } from './controllers/student-form.controller';
import { FormContentService } from './services/form-content.service';
import { SubjectsService } from './services/subjects.service';
import { CareersService } from './services/careers.service';
import { CareersController } from './controllers/careers.controller';
import { SubjectsController } from './controllers/subjects.controller';
import { PrinterModule } from '@/printer/printer.module';

@Module({
  providers: [FormsService, StudentFormService, FormContentService, SubjectsService, CareersService],
  controllers: [FormsController, StudentFormController, CareersController, SubjectsController],
  imports: [PrinterModule]
})
export class FormsModule {}
