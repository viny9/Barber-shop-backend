import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt/jwt-auth.guard';
import { RoleGuard } from './auth/guards/role/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.useGlobalGuards(new JwtAuthGuard())
  app.useGlobalGuards(new RoleGuard(reflector))
  await app.listen(3000);
}

bootstrap();
