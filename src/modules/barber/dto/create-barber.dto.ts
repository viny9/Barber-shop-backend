import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class CreateBarberDto {
    @IsNotEmpty()
    public name: string

    @IsNotEmpty()
    public phoneNumber: string

    @IsEmail()
    public email: string

    @IsNotEmpty()
    public password: string

    @IsEnum(["ADMIN", 'USER', 'BARBER', 'MASTER'])
    public type: Role

    @IsNotEmpty()
    public barberShopId: number
}
