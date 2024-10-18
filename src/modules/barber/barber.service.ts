import { BarberRepository } from './../../database/repositories/barber.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBarberDto } from './dto/update-barber.dto';

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

  async findByBarberShopId(id: number) {
    // Te
    const barbers = await this.barberRepository.findBarberByBarberShopId(id)
    return barbers
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
}
