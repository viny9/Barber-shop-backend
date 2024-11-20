import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { UnauthorizedException } from 'src/shared/exceptions/unathorized.exception';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Email or password is incorrect.')

    const isPasswordValid = user.password === password
    if (!isPasswordValid) throw new UnauthorizedException('Email or password is incorrect.')

    const payload = {
      sub: user.id,
      userName: user.name,
      email: user.email,
      role: user.type
    }

    return {
      user,
      accessToken: this.jwtService.sign(payload)
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, phoneNumber, type } = registerDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use.');
    }


    const createUserDto: CreateUserDto = {
      email,
      password,
      name,
      phoneNumber,
      type,
    };

    const newUser = await this.userService.create(createUserDto);
    return { message: 'User registered successfully', user: newUser };
  }

}
