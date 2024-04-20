import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}