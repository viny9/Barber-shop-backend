import { Type } from "class-transformer"

export class ScheduleFilterDto {

    @Type(() => Number)
    public barberId: number

    @Type(() => Number)
    public userId: number

    @Type(() => Date)
    public date: Date

    public startAt: string
    public endAt: string

}
