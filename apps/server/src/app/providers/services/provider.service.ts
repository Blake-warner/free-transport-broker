import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../entities/provider.entity';
import { Repository } from 'typeorm';
import { RepositoryService } from '../../shared/repository.service';

@Injectable()
export class ProvidersService extends RepositoryService {
    constructor(
        @Inject('TRUCK_DRIVERS_REPOSITORY') 
        private readonly truckProviderRepository: Repository<Provider>,
    ) {
        super(truckProviderRepository);
    }
}