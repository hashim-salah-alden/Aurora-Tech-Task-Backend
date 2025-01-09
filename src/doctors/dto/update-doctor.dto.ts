import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsPhoneNumber('EG', {
    message: 'Phone number must be a valid Egyptian number',
  })
  phone?: string;

  @IsOptional()
  doctorImage?: string;
}
