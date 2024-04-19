import { IsEmail, IsNotEmpty, IsNumberString, IsString, 
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