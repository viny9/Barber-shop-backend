import { CreateBarberDto } from './../barber/dto/create-barber.dto';
import { UserRepository } from './../../database/repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AlredyExistsException } from 'src/shared/exceptions/AlredyExistsException';
import { UserFilterDto } from './dto/user-filter.dto';
import { BarberRepository } from 'src/database/repositories/barber.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private barberRepository: BarberRepository) { }

  async findAll() {
    const users = this.userRepository.findAll()
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new NotFoundException("Couldn't find user with id: " + id)
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findUserByEmail(createUserDto.email)

    if (user) {
      throw new AlredyExistsException('User wiht this email alredy exists')
    }

    const newUser = await this.userRepository.save(createUserDto)
    return newUser
  }

  async createBarberUser(createBarberDto: CreateBarberDto) {
    const user = await this.userRepository.findUserByEmail(createBarberDto.email)

    if (user) {
      throw new AlredyExistsException('User wiht this email alredy exists')
    }

    const barberShopId = createBarberDto.barberShopId
    delete createBarberDto.barberShopId

    const newUser = await this.userRepository.save(createBarberDto)
    return await this.barberRepository.save({ barberShopId: barberShopId, userId: newUser.id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const exists = await this.userRepository.checkIfExist(id)

    if (!exists) {
      throw new NotFoundException("Couldn't find user with id: " + id)
    }

    return this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const exists = await this.userRepository.checkIfExist(id)
    if (!exists) {
      throw new NotFoundException("Couldn't find user with id: " + id)
    }

    return this.userRepository.delete(id)
  }

  async filter(userFilterDto: UserFilterDto) {
    const filterRes = await this.userRepository.filter(userFilterDto)

    if (filterRes.length == 0) {
      throw new NotFoundException("Couldn't found any user with this filter selection")
    }

    return filterRes
  }
}
