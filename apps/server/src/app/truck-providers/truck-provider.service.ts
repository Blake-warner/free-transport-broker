import { Inject, Injectable } from '@nestjs/common';
import { TruckProvider } from './entities/truck-provider.entity';
import { Repository } from 'typeorm';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class TruckProvidersService extends RepositoryService {
    constructor(
        @Inject('TRUCK_DRIVERS_REPOSITORY') 
        private readonly truckProviderRepository: Repository<TruckProvider>
    ) {
        super(truckProviderRepository);
    }
}
