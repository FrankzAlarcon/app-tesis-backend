import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}