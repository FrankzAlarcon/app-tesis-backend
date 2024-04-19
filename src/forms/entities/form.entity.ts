import { Form as FormEntity} from '@prisma/client'

export class Form implements FormEntity {
    id: string;
    name: string;
    code: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}