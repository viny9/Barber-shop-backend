import { BaseEntity } from "src/shared/classes/base.entity"

export class BarberShop extends BaseEntity {
    public name: string
    public location: string
    public openAt: string
    public closeAt: string

    constructor(id: number, name: string, location: string, openAt: string, closeAt: string) {
        super(id)
        this.location = location
        this.openAt = openAt
        this.closeAt = closeAt
    }
}
