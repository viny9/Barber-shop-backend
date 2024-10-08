import AbstractRepository from "./abstract.repository";
import { PrismaService } from "../prisma.service";
import { Barber } from "src/modules/barber/entities/barber.entity";
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BarberRepository extends AbstractRepository<Barber, Prisma.BarberInclude> {
    constructor(protected prisma: PrismaService) {
        const include: Prisma.BarberInclude = {
            user: true
        }

        super(prisma, 'barber', include)
    }

    findBarberByBarberShopId(barberShopId: number) {
        return this.prisma.barber.findMany({
            where: { barberShopId },
            include: {
                user: true,
            }
        })
    }
}