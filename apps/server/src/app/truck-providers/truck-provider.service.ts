import { Inject, Injectable } from '@nestjs/common';
import { TruckProvider } from './entities/truck-provider.entity';
import { Repository } from 'typeorm';
import { RepositoryService } from '../shared/repository.service';
//import { SaveTruckProvidersDto } from './DTOs/save-truck-providers.dto';
//import { ProviderTrucks } from './entities/provider-trucks.entity';
import { ProviderTrucksService } from './provider-trucks.service';
import { SaveTruckProvidersDto } from './DTOs/save-truck-providers.dto';
import { ProviderTrucks } from './entities/provider-trucks.entity';

@Injectable()
export class TruckProvidersService extends RepositoryService {
    constructor(
        @Inject('TRUCK_DRIVERS_REPOSITORY') 
        private readonly truckProviderRepository: Repository<TruckProvider>,
        private readonly providerTrucksRepository: ProviderTrucksService,
    ) {
        super(truckProviderRepository);
    }

   /* saveProvider(saveTruckProvidersDto: SaveTruckProvidersDto) {
        this.save()
        const providerTruck: ProviderTrucks = saveTruckProvidersDto.trucks
        this.providerTrucksRepository.save('val');
    }
        */
}
