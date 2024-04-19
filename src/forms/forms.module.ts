import { Module } from '@nestjs/common';
import { FormsService } from './services/forms.service';
import { FormsController } from './controllers/forms.controller';
import { StudentFormService } from './services/student-form.service';
import { StudentFormController } from './controllers/student-form.controller';

@Module({
  providers: [FormsService, StudentFormService],
  controllers: [FormsController, StudentFormController]
})
export class FormsModule {}
