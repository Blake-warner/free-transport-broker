import { Test, TestingModule } from '@nestjs/testing';
import { ProviderMaterialsService } from './provider-materials.service';

describe('ProviderMaterialsService', () => {
  let service: ProviderMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderMaterialsService],
    }).compile();

    service = module.get<ProviderMaterialsService>(ProviderMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
