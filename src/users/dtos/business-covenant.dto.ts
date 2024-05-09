import { CovenantType } from "@/global/enums/covenant-types.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateBusinessCovenantDto {
  @IsString()
  @IsNotEmpty()
  businessId: string

  // TODO: Replace this with the defined types of the covenant enum
  @IsEnum(CovenantType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the covenant, it could be laboral or vinculation',
    example: 'laboral'
  })
  covenantType: string

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The start date of the covenant, it should be a valid date string in ISO format',
    example: '2024-04-25T23:08:48.519Z'
  })
  startDate: string

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The end date of the covenant, it should be greater than the start date and a valid date string in ISO format',
    example: '2024-04-25T23:08:48.519Z'
  })
  endDate: string
}

export class RemoveBusinessCovenantDto {
  @IsString()
  @IsNotEmpty()
  businessId: string
}