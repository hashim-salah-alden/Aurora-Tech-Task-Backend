import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { QueryDoctorDto } from './dto/query-doctor.dto';

import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const existingUser = await this.prisma.doctor.findFirst({
        where: {
          OR: [
            { email: createDoctorDto.email },
            { phone: createDoctorDto.phone },
          ],
        },
      });
      if (existingUser) {
        throw new HttpException('Email or Phone already in use', 409);
      }
      const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
      const doctor = await this.prisma.doctor.create({
        data: {
          ...createDoctorDto,
          password: hashedPassword,
          schedules: {
            create: createDoctorDto.schedules.map((schedule) => ({
              branch: {
                connect: { id: schedule.branchId }, // Connect to existing branch
              },
              startingTime: schedule.startingTime,
              endingTime: schedule.endingTime,
              workingWeekdays: schedule.workingWeekdays, // Assuming weekdays is stored as a JSON string
            })),
          },
        },
        include: {
          schedules: true, // Optional: to include schedules in the response
        },
      });
      return doctor;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(query: QueryDoctorDto) {
    const { firstName, email, page = 1, limit = 10 } = query;
    // Calculate pagination
    const skip = (page - 1) * limit;
    // Build filtering criteria
    const where: {} = {
      AND: [
        firstName
          ? { firstName: { contains: firstName, mode: 'insensitive' } }
          : undefined,
        email ? { email: { contains: email, mode: 'insensitive' } } : undefined,
      ].filter(Boolean),
    };
    const doctors = await this.prisma.doctor.findMany({
      where,
      skip,
      take: +limit,
      include: {
        schedules: true, // Optional: to include schedules in the response
      },
    });
    const sanitizedDoctors = doctors.map(({ password, ...rest }) => rest);

    const total = doctors.length;
    return {
      data: sanitizedDoctors,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException();
    const { password, ...rest } = doctor;
    return rest;
  }

  async update(id: string, data: UpdateDoctorDto) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException();
    const updatedDoctor = await this.prisma.doctor.update({
      where: { id },
      data,
    });
    const { password, ...rest } = updatedDoctor;
    return rest;
  }

  async remove(id: string) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException();
    const deletedDoctor = await this.prisma.doctor.delete({ where: { id } });
    const { password, ...rest } = deletedDoctor;
    return rest;
  }
}
