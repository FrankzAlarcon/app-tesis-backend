import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'An identificable name for comprehension',
    example: 'Formulario aprobacion de horas de pasantias'
  })
  name?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A description for the form',
    example: 'Este formulario se utiliza para la aprobacion de horas de pasantías'
  })
  description?: string 

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The code assigned by EPN',
    example: 'FAA_001_ETC'
  })
  code: string
}