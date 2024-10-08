import { BarberRepository } from './../../database/repositories/barber.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { UpdateBarberDto } from './dto/update-barber.dto';
import { BarberFilterDto } from './dto/barber-filter.dto';

@Injectable()
export class BarberService {
  constructor(private barberRepository: BarberRepository) { }

  findAll() {
    const babers = this.barberRepository.findAll()
    return babers;
  }

  async findOne(id: number) {
    const barber = await this.barberRepository.findById(id)

    if (!barber) {
      throw new NotFoundException("Couldn't find barber with id: " + id)
    }

    return barber;
  }

  async update(id: number, updateBarberDto: UpdateBarberDto) {
    const exists = await this.barberRepository.checkIfExist(id)

    if (!exists) {
      throw new NotFoundException("Couldn't find barber with id: " + id)
    }

    return this.barberRepository.update(id, updateBarberDto)
  }

  async remove(id: number) {
    const exists = await this.barberRepository.checkIfExist(id)

    if (!exists) {
      throw new NotFoundException("Couldn't find barber with id: " + id)
    }

    return this.barberRepository.delete(id)
  }

  async filter(barberShopFilterDto: BarberFilterDto) {
    const filterRes = await this.barberRepository.filter(barberShopFilterDto)

    if (filterRes.length == 0) {
      throw new NotFoundException("Couldn't found any barber shop with this filter selection")
    }

    return filterRes
  }
}
