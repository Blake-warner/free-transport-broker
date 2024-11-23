import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Material } from '../../materials/material.entity';
import { RepositoryService } from '../../shared/repository.service';

@Injectable()
export class ProviderMaterialsService extends RepositoryService {
    constructor(
        @Inject('PROVIDER_MATERIALS_REPOSITORY')
        private readonly providerMaterialsRepository: Repository<Material>
    ){
        super(providerMaterialsRepository)
    }
}
