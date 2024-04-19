import { StudentFormStatus } from "@/global/enums/student-forms.enum"
import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

export class UploadStudentFormDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'b7458061-a51d-4453-851a-bfa72391e030',
    description: 'The student identifier'
  })
  readonly studentId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'b7458061-a51d-4453-851a-bfa72391e030',
    description: 'The form identifier'
  })
  readonly formId: string

  @IsEnum(StudentFormStatus)
  @IsNotEmpty()
  readonly status?: string
}