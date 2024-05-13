import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  emissionDate: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  issuingBusiness: string;
}