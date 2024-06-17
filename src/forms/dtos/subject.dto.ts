import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  careerId: string;

  @IsNumber()
  @IsNotEmpty()
  semester: number;
}