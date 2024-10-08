import { BaseEntity } from "src/shared/classes/base.entity"
import { CreateUserDto } from "../dto/create-user.dto"
import { Role } from "@prisma/client"

export class User extends BaseEntity {
    public name: string
    public phoneNumber: string
    public email: string
    public password: string
    public type: Role

    constructor(createUserDto: CreateUserDto) {
        super()
        this.name = createUserDto.name
        this.phoneNumber = createUserDto.phoneNumber
        this.email = createUserDto.email
        this.password = createUserDto.password
        this.type = createUserDto.type
    }
}
