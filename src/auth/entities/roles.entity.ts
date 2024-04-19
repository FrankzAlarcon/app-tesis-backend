import { Role as RoleEntity } from '@prisma/client'

export class Role implements RoleEntity {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}