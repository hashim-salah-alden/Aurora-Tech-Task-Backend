import { Injectable } from '@nestjs/common';
import { QueryDoctorDto } from './dto/query-doctor-schedule.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorSchedulesService {
  constructor(private prisma: PrismaService) {}

  // create(createDoctorScheduleDto: CreateDoctorScheduleDto) {
  //   return 'This action adds a new doctorSchedule';
  // }

  async findAll(query: QueryDoctorDto) {
    const { workingWeekdays, branchId } = query;

    const shortDayName = (date: Date, locale: string) =>
      date.toLocaleDateString(locale, { weekday: 'short' });

    let dayName = shortDayName(new Date(workingWeekdays), 'en-EN');
    console.log(workingWeekdays);

    // Return empty response if all parameters are empty
    if (!workingWeekdays && !branchId) {
      return {
        data: [], // Empty array to indicate no results
      };
    }

    let where: {} = {},
      include: {} = {};

    if (workingWeekdays && !branchId) {
      where = {
        workingWeekdays: {
          has: dayName,
        },
      };
      include = {
        branch: true,
      };
    }

    if (workingWeekdays && branchId) {
      where = {
        AND: [
          {
            workingWeekdays: {
              has: dayName,
            },
          },
          {
            branchId,
          },
        ].filter(Boolean),
      };
      include = {
        branch: true,
        doctor: true,
      };
    }

    const Schedules = await this.prisma.doctorSchedule.findMany({
      where,
      include,
    });
    return {
      data: Schedules,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} doctorSchedule`;
  // }

  // update(id: number, updateDoctorScheduleDto: UpdateDoctorScheduleDto) {
  //   return `This action updates a #${id} doctorSchedule`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} doctorSchedule`;
  // }
}
