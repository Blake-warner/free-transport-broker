import { Module } from '@nestjs/common';
import { TruckProvidersService } from './truck-provider.service';
import { TruckProvidersController } from './truck-providers.controller';
import { truckDriversProvider } from './truck-providers.provider';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule
  ],
  providers: [
    TruckProvidersService,
    ...truckDriversProvider
  ],
  controllers: [TruckProvidersController],
})
export class TruckProvidersModule {}
