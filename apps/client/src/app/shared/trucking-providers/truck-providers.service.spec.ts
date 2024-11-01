import { TestBed } from '@angular/core/testing';

import { TruckProvidersService } from './truck-providers.service';

describe('TruckingProvidersService', () => {
  let service: TruckProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruckProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
