import { Test, TestingModule } from '@nestjs/testing';
import { BarberShopService } from './barber-shop.service';

describe('BarberShopService', () => {
  let service: BarberShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarberShopService],
    }).compile();

    service = module.get<BarberShopService>(BarberShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
