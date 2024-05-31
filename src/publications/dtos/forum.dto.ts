import { IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator"

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  grade: number


  @IsString()
  @IsUUID()
  @IsNotEmpty()
  businessId: string
}