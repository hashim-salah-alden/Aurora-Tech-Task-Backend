import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  sessionTypeId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Automatically transforms the string to a Date object
  date: Date;

  @IsNotEmpty()
  @IsString()
  branchId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date) // Automatically transforms the string to a Date object
  time: Date;

  @IsNotEmpty()
  @IsString()
  doctorId: string;
}
