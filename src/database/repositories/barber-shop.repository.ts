import AbstractRepository from "./abstract.repository";
import { BarberShop } from "../../modules/barber-shop/entities/barber-shop.entity";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { BarberShopFilterDto } from "../../modules/barber-shop/dto/barbershop-filter.dto";

@Injectable()
export class BarberShopRepository extends AbstractRepository<BarberShop, BarberShopFilterDto> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'barberShop')
    }

    findBarberShopByName(name: string): Promise<BarberShop> {
        return this.prisma.barberShop.findUnique({
            where: { name }
        })
    }
}