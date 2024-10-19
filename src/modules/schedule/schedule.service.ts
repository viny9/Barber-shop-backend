import { ScheduleRepository } from './../../database/repositories/schedule.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleFilterDto } from './dto/schedule-filter.dto';
import { BarberRepository } from '../../database/repositories/barber.repository';

@Injectable()
export class ScheduleService {
  constructor(private scheduleRepository: ScheduleRepository, private barberRepository: BarberRepository) { }

  findAll() {
    const schedules = this.scheduleRepository.findAll()
    return schedules;
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findById(id)

    if (!schedule) {
      throw new NotFoundException("Couldn't find schedule with id: " + id)
    }

    return schedule;
  }

  async findBarberShopSchedule(barberShopId: number) {
    const barbers = await this.barberRepository.findBarberByBarberShopId(barberShopId)
    // dont have barber 
    const allSchedules = barbers.map(async (barber) => {
      const barberSchedules = await this.scheduleRepository.findAllBarberSchedules(barber.id)
      return barberSchedules
    })

    return await Promise.all(allSchedules)
  }


  async findBarberSchedules(barberId: number) {
    // check user exists
    return await this.scheduleRepository.findAllBarberSchedules(barberId)
  }

  async findUserSchedules(userId: number) {
    // check user exists
    return await this.scheduleRepository.findAllUserSchedules(userId)
  }

  async create(createScheduleDto: CreateScheduleDto) {
    return await this.scheduleRepository.save(createScheduleDto)
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const exists = await this.scheduleRepository.checkIfExist(id)

    if (!exists) {
      throw new NotFoundException("Couldn't find schedule with id: " + id)
    }

    return this.scheduleRepository.update(id, updateScheduleDto)
  }

  async remove(id: number) {
    const exists = await this.scheduleRepository.checkIfExist(id)
    if (!exists) {
      throw new NotFoundException("Couldn't find schedule with id: " + id)
    }

    return this.scheduleRepository.delete(id)
  }

  async filter(scheduleFilterDto: ScheduleFilterDto) {
    const filterRes = await this.scheduleRepository.filter(scheduleFilterDto)

    if (filterRes.length == 0) {
      throw new NotFoundException("Couldn't found any schedule with this filter selection")
    }

    return filterRes
  }
}
