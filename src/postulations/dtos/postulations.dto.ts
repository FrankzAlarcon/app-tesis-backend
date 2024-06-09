import { PostulationStatus } from "@/global/enums/postulation-states.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostulationDto {
  @IsString()
  @IsNotEmpty()
  message: string

  @IsEnum(PostulationStatus)
  status: PostulationStatus

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  urlCV?: string

  @IsString()
  @IsNotEmpty()
  publicationId: string
}