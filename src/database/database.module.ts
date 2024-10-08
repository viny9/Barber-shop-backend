import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { BarberRepository } from './repositories/barber.repository';
import { BarberShopRepository } from './repositories/barber-shop.repository';
import { ScheduleRepository } from './repositories/schedule.repository';
import { PrismaService } from './prisma.service';

@Module({
    exports: [
        BarberRepository,
        BarberShopRepository,
        ScheduleRepository,
        UserRepository,
        PrismaService
    ],
    providers: [
        BarberRepository,
        BarberShopRepository,
        ScheduleRepository,
        UserRepository,
        PrismaService
    ]
})
export class DatabaseModule { }
