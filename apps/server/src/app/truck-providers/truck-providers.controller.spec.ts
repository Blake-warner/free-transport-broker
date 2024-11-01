import { Test, TestingModule } from '@nestjs/testing';
import { TruckProvidersController } from './truck-providers.controller';

describe('TruckDriversController', () => {
  let controller: TruckProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckProvidersController],
    }).compile();

    controller = module.get<TruckProvidersController>(TruckProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
