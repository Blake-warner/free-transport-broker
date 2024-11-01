import { DataSource } from "typeorm";
import { TruckProvider } from "./entities/truck-provider.entity";

export const truckDriversProvider = [
    {
        provide: 'TRUCK_DRIVERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TruckProvider),
        inject: ['DATA_SOURCE'],
    },
]