import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsArray()
  @IsString({ each: true })
  skillsIds: string[];
}