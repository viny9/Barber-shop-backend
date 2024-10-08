import { BaseEntity } from "src/shared/classes/base.entity"

export class Barber extends BaseEntity {
    public barberShopId: number
    public userId: number

    constructor(id: number, barberShopId: number, userId: number) {
        super(id)
        this.barberShopId = barberShopId
        this.userId = userId
    }
}
