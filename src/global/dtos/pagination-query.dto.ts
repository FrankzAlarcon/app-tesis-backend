import {
  IsNumber,
  IsOptional,
  IsString,
  // IsPositive,
  Min
} from "class-validator";

export class PaginationQueryDto {
  @IsNumber()
  // @IsPositive()
  @Min(0)
  @IsOptional()
  limit?: number

  @IsNumber()
  // @IsPositive()
  @Min(0)
  @IsOptional()
  offset?: number

  @IsString()
  @IsOptional()
  filterField?: string

  @IsString()
  @IsOptional()
  filterValue?: string

  @IsString()
  @IsOptional()
  orderField?: string

  @IsString()
  @IsOptional()
  orderDirection?: 'asc' | 'desc'
}