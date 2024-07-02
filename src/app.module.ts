import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FormsModule } from './forms/forms.module';
import { PublicationsModule } from './publications/publications.module';
import { PostulationsModule } from './postulations/postulations.module';
import { PrinterModule } from './printer/printer.module';
import config from './config';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    FormsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config]
    }),
    PublicationsModule,
    PostulationsModule,
    PrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
