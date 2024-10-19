import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { UnauthorizedException } from '../shared/exceptions/unathorized.exception';

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
}
