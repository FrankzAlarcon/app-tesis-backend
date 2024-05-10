import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, 
  // IsStrongPassword 
} from "class-validator"

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  // @IsStrongPassword({ minLength: 8 })
  password: string

  @IsString()
  faculty: string

  @IsNumberString()
  ira: string
}

export class CompleteStudentProfileDto {
  @IsString()
  @IsOptional()
  shortPresentation?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  faculty?: string

  @IsNumberString()
  @IsOptional()
  ira?: string
}