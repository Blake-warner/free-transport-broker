import { Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import { RepositoryService } from '../shared/repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends RepositoryService {
    constructor(
        //@Inject("USER_REPOSITORY") private userRepository: Repository<User>
        @InjectRepository(User) private userRepository: Repository<User>
    ){
        super(userRepository);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }
}
