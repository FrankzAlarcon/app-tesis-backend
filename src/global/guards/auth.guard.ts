import config from '@/config';
import { Role } from '@/global/enums/roles.enum';
import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@/global/interfaces/jwt.interface';
import { PrismaService } from '@/database/services/prisma.service';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(config.KEY) private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    console.log({roles})
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    try {
      const payload = await this.jwtService.verify(token,
        { secret: this.configService.jwt.secret }
      ) as JwtPayload
      console.log({payload})

      //TODO: Manage the roles

      const isAuthorized = await this.checkRole(payload.role, roles)

      if (!isAuthorized) {
        throw new UnauthorizedException('Unathorized')
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new UnauthorizedException('No valid token');
    }
    return true;
  }


  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async checkRole(roleId: string, authorizedRoles: string[]) {
    const userRole = await this.prismaService.role.findFirst({ where: { id: roleId }})
    if (!userRole) {
      throw new BadRequestException('Role not found')
    }
    console.log({ authorizedRoles, userRole })
    return authorizedRoles.includes(userRole.name)
  }
}
