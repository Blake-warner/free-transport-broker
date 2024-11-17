import { Test, TestingModule } from '@nestjs/testing';
import { Trucks } from './trucks.provider';

describe('Trucks', () => {
  let provider: Trucks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Trucks],
    }).compile();

    provider = module.get<Trucks>(Trucks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
