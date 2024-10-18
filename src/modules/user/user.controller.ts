import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { CreateBarberDto } from '../barber/dto/create-barber.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/filter')
  filter(@Query() userFilterDto: UserFilterDto) {
    return this.userService.filter(userFilterDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('barber')
  createBarberUser(@Body() createBarberDto: CreateBarberDto) {
    return this.userService.createBarberUser(createBarberDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


}
