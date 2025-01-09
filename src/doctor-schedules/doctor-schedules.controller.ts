import { Controller, Get, Query, Req } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { QueryDoctorDto } from './dto/query-doctor-schedule.dto';

@Controller('doctor-schedules')
export class DoctorSchedulesController {
  constructor(
    private readonly doctorSchedulesService: DoctorSchedulesService,
  ) {}

  // @Post()
  // create(@Body() createDoctorScheduleDto: CreateDoctorScheduleDto) {
  //   return this.doctorSchedulesService.create(createDoctorScheduleDto);
  // }

  @Get()
  findAll(@Query() query: QueryDoctorDto) {
    return this.doctorSchedulesService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.doctorSchedulesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorScheduleDto: UpdateDoctorScheduleDto) {
  //   return this.doctorSchedulesService.update(+id, updateDoctorScheduleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.doctorSchedulesService.remove(+id);
  // }
}
