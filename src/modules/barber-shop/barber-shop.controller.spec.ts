import { Test, TestingModule } from '@nestjs/testing';
import { BarberShopController } from './barber-shop.controller';
import { BarberShopService } from './barber-shop.service';

describe('BarberShopController', () => {
  let controller: BarberShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarberShopController],
      providers: [BarberShopService],
    }).compile();

    controller = module.get<BarberShopController>(BarberShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
