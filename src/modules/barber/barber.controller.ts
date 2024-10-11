import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarberService } from './barber.service';
import { UpdateBarberDto } from './dto/update-barber.dto';

@Controller('barber')
export class BarberController {

  constructor(private readonly barberService: BarberService) { }

  @Get()
  findAll() {
    return this.barberService.findAll();
  }

  @Get('/barberShop/:id')
  findBarbersByBarberShop(@Param('id') id: string) {
    return this.barberService.findByBarberShopId(+id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarberDto: UpdateBarberDto) {
    return this.barberService.update(+id, updateBarberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barberService.remove(+id);
  }
}
