import { Role } from "@prisma/client"

export class UserFilterDto {
    email?: string
    name?: string
    phoneNumber?: string
    type?: Role
}