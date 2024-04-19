import { Auth as AuthEntity } from '@prisma/client'

export class Auth implements AuthEntity {
  id: string;
  password: string;
  token: string | null;
  createdAt: Date;
  updatedAt: Date;
}