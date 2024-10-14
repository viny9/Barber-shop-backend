import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() createAuthDto: loginDto) {
    return this.authService.login(createAuthDto.email, createAuthDto.password);
  }

}
