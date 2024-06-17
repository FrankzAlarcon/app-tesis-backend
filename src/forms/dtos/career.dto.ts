import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCareerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}