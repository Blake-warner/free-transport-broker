import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { trucksProvider } from './trucks.provider';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule
  ],
  controllers: [TrucksController],
  providers: [
    TrucksService,
    ...trucksProvider
  ],
})
export class TrucksModule {}
