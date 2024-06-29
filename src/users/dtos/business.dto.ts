import { CustomStringLength } from "@/global/validators/custom-string-length"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"

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
}

export class CompleteProfileDto {
  @IsString()
  @IsOptional()
  province?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  @Validate(CustomStringLength)
  phone?: string

  @IsString()
  @IsOptional()
  shortPresentation?: string

  @IsString()
  @IsOptional()
  description?: string
}