import { Test, TestingModule } from '@nestjs/testing';
import { TruckDriversService } from './truck-drivers.service';

describe('TruckDriversService', () => {
  let service: TruckDriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckDriversService],
    }).compile();

    service = module.get<TruckDriversService>(TruckDriversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
