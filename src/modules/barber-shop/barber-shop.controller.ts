import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BarberShopService } from './barber-shop.service';
import { CreateBarberShopDto } from './dto/create-barber-shop.dto';
import { UpdateBarberShopDto } from './dto/update-barber-shop.dto';
import { BarberShopFilterDto } from './dto/barbershop-filter.dto';

@Controller('barber-shop')
export class BarberShopController {
  constructor(private readonly barberShopService: BarberShopService) {}

  @Post()
  create(@Body() createBarberShopDto: CreateBarberShopDto) {
    return this.barberShopService.create(createBarberShopDto);
  }

  @Get()
  findAll() {
    return this.barberShopService.findAll();
  }
  
  @Get('/filter')
  filter(@Query() barberShopFilterDto: BarberShopFilterDto) {
    return this.barberShopService.filter(barberShopFilterDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberShopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarberShopDto: UpdateBarberShopDto) {
    return this.barberShopService.update(+id, updateBarberShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barberShopService.remove(+id);
  }
}
