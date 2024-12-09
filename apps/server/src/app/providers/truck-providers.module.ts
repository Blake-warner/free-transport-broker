import { Module } from '@nestjs/common';
import { ProvidersService } from './services/provider.service';
import { ProvidersController } from './truck-providers.controller';
import { truckDriversProvider } from './truck-providers.provider';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { ProviderTrucksService } from './services/provider-trucks.service';
import { ProviderMaterialsService } from './services/provider-materials.service';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [
    ProvidersService,
    ProviderTrucksService,
    ...truckDriversProvider,
    ProviderMaterialsService,
  ],
  controllers: [ProvidersController],
})
export class TruckProvidersModule {}
