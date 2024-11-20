import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    phoneNumber: string;

    @IsEnum(["ADMIN", 'USER', 'BARBER', 'MASTER'])
    type: Role;
}
