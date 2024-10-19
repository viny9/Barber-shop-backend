import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../database/database.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [DatabaseModule, ScheduleModule],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule { }
