import AbstractRepository from "./abstract.repository";
import { PrismaService } from "../prisma.service";
import { User } from "../../modules/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { UserFilterDto } from "../../modules/user/dto/user-filter.dto";

@Injectable()
export class UserRepository extends AbstractRepository<User, UserFilterDto> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'user')
    }

    findUserByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }
}