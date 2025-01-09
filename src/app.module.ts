import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ReservationModule } from './reservation/reservation.module';
import { BranchsModule } from './branchs/branchs.module';
import { SessionsTypesModule } from './sessions-types/sessions-types.module';
import { DoctorSchedulesModule } from './doctor-schedules/doctor-schedules.module';

@Module({
  imports: [PrismaModule, DoctorsModule, ReservationModule, BranchsModule, SessionsTypesModule, DoctorSchedulesModule],
})
export class AppModule {}
