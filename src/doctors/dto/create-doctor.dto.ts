import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleDto {
  @IsString()
  branchId: string;

  @IsString()
  startingTime: string;

  @IsString()
  endingTime: string;

  @IsArray()
  @IsString({ each: true })
  workingWeekdays: string[];
}

export class CreateDoctorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('EG', {
    message: 'Phone number must be a valid Egyptian number',
  })
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedules: ScheduleDto[];

  @IsOptional()
  doctorImage: string;
}
