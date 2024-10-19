import { BaseEntity } from "../../../shared/classes/base.entity"

export class Schedule extends BaseEntity {
    public userId: number
    public barberId: number
    public startAt: string
    public endAt: string
    public date: Date

    constructor(
        id: number,
        userId: number,
        barberId: number,
        startAt: string,
        endAt: string,
        date: Date) {
        super(id)

        this.userId = userId
        this.barberId = barberId
        this.startAt = startAt
        this.endAt = endAt
        this.date = date
    }
}
