import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string
}

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}