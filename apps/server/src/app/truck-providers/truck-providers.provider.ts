import { DataSource } from "typeorm";
import { TruckProvider } from "./entities/truck-provider.entity";
import { ProviderTrucks } from "./entities/provider-trucks.entity";

export const truckDriversProvider = [
    {
        provide: 'TRUCK_DRIVERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TruckProvider),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROVIDER_TRUCKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProviderTrucks),
        inject: ['DATA_SOURCE'],
    }
]