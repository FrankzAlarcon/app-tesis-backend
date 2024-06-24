import { Modality } from '@/global/enums/modality.enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches
} from "class-validator";

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Modality)
  @IsNotEmpty()
  modality: string;

  @Matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
  @IsNotEmpty()
  entryTime: string;

  @Matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
  @IsNotEmpty()
  departureTime: string;

  @IsString()
  @IsNotEmpty()
  benefits: string;

  @IsString()
  @IsNotEmpty()
  requirements: string

  @IsString()
  @IsOptional()
  url?: string;

  @IsNumberString()
  @IsOptional()
  remuneration?: string;

  @IsArray()
  @IsString({ each: true })
  skillsIds: string[];

  @IsArray()
  @IsString({ each: true })
  notRegisteredSkills: string[];
}