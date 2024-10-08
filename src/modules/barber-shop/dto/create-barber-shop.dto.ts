import { IsNotEmpty } from "class-validator"

export class CreateBarberShopDto {
    @IsNotEmpty()
    public name: string

    @IsNotEmpty()
    public location: string
    
    @IsNotEmpty()
    public openAt: string

    @IsNotEmpty()
    public closeAt: string
}
