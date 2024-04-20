import { AuthService } from '@/auth/services/auth.service';
import { RolesService } from '@/auth/services/roles.service';
import { PrismaService } from '@/database/services/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/student.dto';
import { Role } from '@/global/enums/roles.enum';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolesService: RolesService,
    private readonly authService: AuthService
  ) {}

  create(data: CreateStudentDto) {
    // TODO: add email validation, and those things
    return this.prismaService.$transaction(async (tx) => {
      const auth = await this.authService.create({
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
