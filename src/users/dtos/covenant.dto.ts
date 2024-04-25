import { CovenantType } from "@/global/enums/covenant-types.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCovenantDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string

    // TODO: Define the types of the covenant
    @IsEnum(CovenantType)
    @IsNotEmpty()
    type: string
}