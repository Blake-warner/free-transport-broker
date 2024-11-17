import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Truck } from './truck.entity';
import { RepositoryService } from '../shared/repository.service';


@Injectable()
export class TrucksService extends RepositoryService {
    constructor(
        @Inject('TRUCKS_REPOSITORY')
        private readonly trucksRepository: Repository<Truck>
    ){
        super(trucksRepository);
    }
}
