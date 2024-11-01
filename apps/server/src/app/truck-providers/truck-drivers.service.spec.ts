import { Test, TestingModule } from '@nestjs/testing';
import { TruckProvidersService } from './truck-provider.service';

describe('TruckDriversService', () => {
  let service: TruckProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckProvidersService],
    }).compile();

    service = module.get<TruckProvidersService>(TruckProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
