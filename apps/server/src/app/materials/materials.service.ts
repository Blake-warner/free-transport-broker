import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { RepositoryService } from '../shared/repository.service';

@Injectable()
export class MaterialsService extends RepositoryService {
    constructor(
        @Inject('MATERIALS_REPOSITORY')
        private readonly materialsRepository: Repository<Material>
    ){
        super(materialsRepository);
    }
}
