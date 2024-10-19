import { Module } from '@nestjs/common';
import { BarberService } from './barber.service';
import { BarberController } from './barber.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ScheduleService } from '../schedule/schedule.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BarberController],
  providers: [BarberService, ScheduleService],
})
export class BarberModule { }
