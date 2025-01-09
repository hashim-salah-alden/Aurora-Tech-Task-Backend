import { IsOptional, IsString, IsInt, Min, Max, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryReservationDto {
  @IsOptional()
  // @IsDate()
  today?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
