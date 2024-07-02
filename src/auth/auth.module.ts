import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { AuthService } from './services/auth.service';
import { RolesController } from './controllers/roles.controller';
import { JwtModule } from '@nestjs/jwt';
import config from '@/config';
import { ConfigType } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { EmailService } from './services/email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      global: true,
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: { expiresIn: '1d' }
        }
      }
    }),
    MailerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        console.log(configService.email)
        return ({
          transport: {
            host: configService.email.host,
            port: configService.email.port,
            secure: true,
            auth: {
              user: configService.email.user,
              pass: configService.email.pass
            }
          }
        })
      }
    
    })
  ],
  providers: [RolesService, AuthService, EmailService],
  exports: [RolesService, AuthService],
  controllers: [RolesController, AuthController]
})
export class AuthModule {}
