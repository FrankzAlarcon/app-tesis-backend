import { CovenantType } from "@/global/enums/covenant-types.enum";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateBusinessCovenantDto {
  @IsString()
  @IsNotEmpty()
  businessId: string

  // TODO: Replace this with the defined types of the covenant enum
  @IsEnum(CovenantType)
  @IsNotEmpty()
  covenantType: string

  @IsDateString()
  @IsNotEmpty()
  startDate: string

  @IsDateString()
  @IsNotEmpty()
  endDate: string
}

export class RemoveBusinessCovenantDto {
  @IsString()
  @IsNotEmpty()
  businessId: string
}