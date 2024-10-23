import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
  ],
  exports: [UserService]
})
export class UserModule {}
