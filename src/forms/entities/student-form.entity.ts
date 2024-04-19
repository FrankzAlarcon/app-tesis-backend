import { StudenForm as StudentFormEntity } from "@prisma/client";

export class StudentForm implements StudentFormEntity {
  id: string;
  startDate: Date;
  approvalDate: Date;
  url: string;
  status: string;

  studentId: string;
  formId: string;

  createdAt: Date;
  updatedAt: Date;
}