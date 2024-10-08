import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateScheduleDto {
    @IsNumber()
    public userId: number

    @IsNumber()
    public barberId: number

    @IsNotEmpty()
    public startAt: string

    @IsNotEmpty()
    public endAt: string

    @IsNotEmpty()
    public date: Date
}
