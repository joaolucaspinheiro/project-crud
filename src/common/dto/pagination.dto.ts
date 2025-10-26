import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly offset?: number;
}
