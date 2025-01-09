import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryDoctorDto {
  @IsOptional()
  @IsString()
  workingWeekdays?: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  // @IsOptional()
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // page?: number = 1;

  // @IsOptional()
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @Max(100)
  // limit?: number = 10;
}
