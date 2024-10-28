import { Module } from '@nestjs/common';
import { TruckDriversService } from './truck-drivers.service';
import { TruckDriversController } from './truck-drivers.controller';
import { truckDriversProvider } from './truck-drivers.provider';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule
  ],
  providers: [
    TruckDriversService,
    ...truckDriversProvider
  ],
  controllers: [TruckDriversController],
})
export class TruckDriversModule {}
