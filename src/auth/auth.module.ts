import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { AuthService } from './services/auth.service';
import { RolesController } from './controllers/roles.controller';
import { JwtModule } from '@nestjs/jwt';
import config from '@/config';
import { ConfigType } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      global: true,
      useFactory: (configService: ConfigType<typeof config>) => {
        console.log(configService)
        return {
          secret: configService.jwt.secret,
          signOptions: { expiresIn: '1d' }
        }
      }
    })
  ],
  providers: [RolesService, AuthService],
  exports: [RolesService, AuthService],
  controllers: [RolesController, AuthController]
})
export class AuthModule {}
