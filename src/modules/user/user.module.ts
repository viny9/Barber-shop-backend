import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ScheduleService } from '../schedule/schedule.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ScheduleService],
})
export class UserModule { }
