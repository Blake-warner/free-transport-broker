import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RepositoryService } from '../../shared/repository.service';
import { ProviderTrucks } from '../entities/provider-trucks.entity';

@Injectable()
export class ProviderTrucksService extends RepositoryService {
    constructor(
        @Inject('PROVIDER_TRUCKS_REPOSITORY') 
        private readonly providerTrucksRepository: Repository<ProviderTrucks>,
    ) {
        super(providerTrucksRepository);
    }
}
