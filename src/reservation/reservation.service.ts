import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    try {
      const existingReservation = await this.prisma.reservation.findFirst({
        where: {
          AND: [
            { doctorId: createReservationDto.doctorId },
            { time: new Date(createReservationDto.time) }, // Ensure Date object for comparison
          ],
        },
      });
      if (existingReservation) {
        throw new HttpException(
          'The doctor already has a reservation at this time.',
          409,
        );
      }

      const newReservation = await this.prisma.reservation.create({
        data: {
          ...createReservationDto,
        },
      });
      return newReservation;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(query: QueryReservationDto) {
    let { today= null, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;
    // Normalize the date to the start of the day
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight
    // End of the day
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const where: {} = today
      ? {
          date: {
            gte: currentDate, // greater than or equal to today's start time
            lte: endOfDay, // less than or equal to today's end time
          },
        }
      : {};

    const sessions = await this.prisma.reservation.findMany({
      where,
      skip,
      take: +limit,
      include: {
        branch: true, // Optional: to include branch in the response
        doctor: true,
        sessionType: true,
      },
    });

    const total = sessions.length;

    return {
      data: sessions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  async remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
