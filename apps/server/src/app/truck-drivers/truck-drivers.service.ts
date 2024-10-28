import { Inject, Injectable } from '@nestjs/common';
import { TruckDriver } from './truck-driver.entity';
import { Repository } from 'typeorm';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class TruckDriversService extends RepositoryService {
    constructor(
        @Inject('TRUCK_DRIVERS_REPOSITORY') 
        private readonly truckDriverRepository: Repository<TruckDriver>
    ) {
        super(truckDriverRepository);
    }
}
