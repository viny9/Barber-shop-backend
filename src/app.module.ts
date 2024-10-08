import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BarberModule } from './modules/barber/barber.module';
import { BarberShopModule } from './modules/barber-shop/barber-shop.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    BarberShopModule,
    BarberModule,
    ScheduleModule,
    UserModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
