import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string
}