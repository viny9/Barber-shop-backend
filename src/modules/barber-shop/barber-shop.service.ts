import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBarberShopDto } from './dto/create-barber-shop.dto';
import { UpdateBarberShopDto } from './dto/update-barber-shop.dto';
import { BarberShopRepository } from 'src/database/repositories/barber-shop.repository';
import { AlredyExistsException } from '../../shared/exceptions/alredy-exists.exception';
import { BarberShopFilterDto } from './dto/barbershop-filter.dto';

@Injectable()
export class BarberShopService {

  constructor(private barberShopRepository: BarberShopRepository) { }

  findAll() {
    const baberShops = this.barberShopRepository.findAll()
    return baberShops;
  }

  async findOne(id: number) {
    const barberShop = await this.barberShopRepository.findById(id)

    if (!barberShop) {
      throw new NotFoundException("Couldn't find barber shop with id: " + id)
    }

    return barberShop;
  }

  async create(createBarberShopDto: CreateBarberShopDto) {
    const barberShop = await this.barberShopRepository.findBarberShopByName(createBarberShopDto.name)

    if (barberShop) {
      throw new AlredyExistsException('barber shop wiht this name alredy exists')
    }

    return await this.barberShopRepository.save(createBarberShopDto)
  }

  async update(id: number, updateBarberShopDto: UpdateBarberShopDto) {
    const exists = await this.barberShopRepository.checkIfExist(id)

    if (!exists) {
      throw new NotFoundException("Couldn't find barber shop with id: " + id)
    }

    return this.barberShopRepository.update(id, updateBarberShopDto)
  }

  async remove(id: number) {
    const exists = await this.barberShopRepository.checkIfExist(id)
    if (!exists) {
      throw new NotFoundException("Couldn't find barber shop with id: " + id)
    }

    return this.barberShopRepository.delete(id)
  }

  async filter(barberShopFilterDto: BarberShopFilterDto) {
    const filterRes = await this.barberShopRepository.filter(barberShopFilterDto)

    if (filterRes.length == 0) {
      throw new NotFoundException("Couldn't found any barber shop with this filter selection")
    }

    return filterRes
  }
}
