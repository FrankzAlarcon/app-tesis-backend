import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'Publication identifier (an uuid)',
  })
  @IsString()
  @IsNotEmpty()
  publicationId: string
}