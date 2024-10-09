import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ScheduleController],
  exports: [ScheduleService],
  providers: [ScheduleService],
})
export class ScheduleModule { }
