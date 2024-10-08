import AbstractRepository from "./abstract.repository";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import { Schedule } from '../../modules/schedule/entities/schedule.entity';
import { Injectable } from "@nestjs/common";
import { ScheduleFilterDto } from "src/modules/schedule/dto/Schedule-filter.dto";

@Injectable()
export class ScheduleRepository extends AbstractRepository<Schedule, ScheduleFilterDto, Prisma.ScheduleInclude> {
    constructor(protected prisma: PrismaService) {
        const include: Prisma.ScheduleInclude = {
            user: true,
            barber: true
        }

        super(prisma, 'schedule', include)
    }

    findAllBarberSchedules(barberId: number) {
        return this.prisma.schedule.findMany({
            where: { barberId },
            orderBy: { startAt: "asc" },
            include: {
                user: true,
                barber: true
            }
        })
    }

    findAllUserSchedules(userId: number) {
        return this.prisma.schedule.findMany({
            where: { userId },
            orderBy: { startAt: "asc" },
            include: {
                user: true,
                barber: true
            }
        })
    }
}