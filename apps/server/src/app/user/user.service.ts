import { Inject, Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import { RepositoryService } from '../shared/repository.service';
import { Repository } from 'typeorm';
//import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends RepositoryService {
    constructor(
        @Inject("USER_REPOSITORY") private userRepository: Repository<User>
        //@InjectRepository(User) private userRepository: Repository<User>
    ){
        super(userRepository);
    }
}
