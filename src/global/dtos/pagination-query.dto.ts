import {
  IsNumber,
  IsOptional,
  // IsPositive,
  Min
} from "class-validator";

export class PaginationQueryDto {
  @IsNumber()
  // @IsPositive()
  @Min(0)
  @IsOptional()
  limit: number

  @IsNumber()
  // @IsPositive()
  @Min(0)
  @IsOptional()
  offset: number
}