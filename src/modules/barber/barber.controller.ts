import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarberService } from './barber.service';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { ScheduleService } from '../schedule/schedule.service';

@Controller('barber')
export class BarberController {
  
  constructor(
    private readonly barberService: BarberService,
    private readonly scheduleService: ScheduleService
  ) { }

  @Get()
  findAll() {
    return this.barberService.findAll();
  }

  @Get(':id/schedules')
  findBarberSchedules(@Param('id') id: string) {
    return this.scheduleService.findBarberSchedules(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.barberService.update(+id, updateBarberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barberService.remove(+id);
  }
}
