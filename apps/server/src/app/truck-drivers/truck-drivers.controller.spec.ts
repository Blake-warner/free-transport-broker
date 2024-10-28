import { Test, TestingModule } from '@nestjs/testing';
import { TruckDriversController } from './truck-drivers.controller';

describe('TruckDriversController', () => {
  let controller: TruckDriversController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckDriversController],
    }).compile();

    controller = module.get<TruckDriversController>(TruckDriversController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
