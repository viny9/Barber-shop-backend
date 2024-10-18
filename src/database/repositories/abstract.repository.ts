import { Repository } from "src/shared/interfaces/Repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export default abstract class AbstractRepository<T, F = any, U = any,> implements Repository<T, F> {
    constructor(
        protected readonly prisma: PrismaService,
        private readonly tableName: string,
        private readonly includes?: U) { }


    save(data: T): Promise<T> {
        return this.prisma[this.tableName].create({
            data,
            include: this.includes
        })
    }

    findAll(): Promise<T[]> {
        return this.prisma[this.tableName].findMany({
            include: this.includes
        })
    }

    findById(id: number): Promise<T> {
        return this.prisma[this.tableName].findUnique({
            where: { id },
            include: this.includes
        })
    }

    update(id: number, data: Partial<T>): Promise<T> {
        return this.prisma[this.tableName].update({
            where: { id },
            data: data,
            include: this.includes
        })
    }

    delete(id: number): Promise<T> {
        return this.prisma[this.tableName].delete({
            where: { id },
            include: this.includes
        })
    }

    checkIfExist(id: number): Promise<boolean> {
        return this.prisma[this.tableName]
            .findUnique({
                where: { id }
            })
            .then((data) => {
                if (data) return true

                return false
            })
    }

    filter(filterDto: F): Promise<T[]> {
        const filterWhere: any = {}

        Object.keys(filterDto).forEach((field) => {
            const fieldValue = filterDto[field]
            const fieldType = typeof filterDto[field]

            if (fieldType == "number") {
                filterWhere[field] = { equals: fieldValue }
            } else if (field == 'date') {
                const date = new Date(filterDto['date'])
                date.setUTCHours(0, 0, 0);

                const endOfDay = new Date(filterDto['date'])
                endOfDay.setUTCHours(23, 59, 59);

                filterWhere[field] = {
                    gte: date,
                    lte: endOfDay
                }
            } else {
                filterWhere[field] = { contains: fieldValue }
            }
        })

        return this.prisma[this.tableName].findMany({
            where: { ...filterWhere },
            include: this.includes
        })
    }

}  