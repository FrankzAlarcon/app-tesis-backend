import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto, CreateAuthDto, LoginDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from '../entities/auth.entity';
import { CreateStudentDto } from '@/users/dtos/student.dto';
import { Role } from '@/global/enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async create(data: CreateAuthDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    return await this.prismaService.auth.create({
      data: { password: hash }
    })
  }

  async login (data: LoginDto): Promise<AuthenticatedUser> {
    const user = await this.prismaService.user.findFirst({
      where: { email: data.email },
      include: { auth: true, roles: true }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    const hashedPassword = user.auth.password
    const isCorrectPassword = await bcrypt.compare(data.password, hashedPassword)

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid Credentials')
    }
    console.log(user)
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.roleId
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: {
          id: user.roles.id,
          name: user.roles.name
        }
      },
      accessToken: this.jwtService.sign(payload)
    }
  }

  async registerAdmin(data: CreateAdminDto) {
    return this.prismaService.$transaction(async (tx) => {
      const auth = await this.create({
        password: data.password
      })

      const role = await tx.role.findFirst({ where: { name: Role.ADMIN }})

      if (!role) {
        throw new BadRequestException('Role not found')
      }

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          roleId: role.id,
          authId: auth.id,
        }
      })

      return user
    })
  }

  async registerStudent(data: CreateStudentDto) {
    // TODO: add email validation, and those things
    return this.prismaService.$transaction(async (tx) => {
      const auth = await this.create({
        password: data.password
      })
      const role = await tx.role.findFirst({
        where: { name: Role.STUDENT }
      })

      if (!role) {
        throw new BadRequestException('Role not found')
      }

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          roleId: role.id,
          authId: auth.id,
        }
      })

      const student = await tx.student.create({
        data: {
          userId: user.id,
          faculty: data.faculty,
          ira: data.ira
        }
      })

      return student
    })
  }
}
