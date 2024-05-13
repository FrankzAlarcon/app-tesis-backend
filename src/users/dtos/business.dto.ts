import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateBusinessDto {
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
  @IsNotEmpty()
  businessName: string
}

export class CompleteProfileDto {
  @IsString()
  @IsOptional()
  province?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @Length(10)
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  description?: string
}