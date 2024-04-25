import { IsEmail, IsNotEmpty, IsString } from "class-validator"

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
  province?: string
  city?: string
  phone?: string
  description?: string
}