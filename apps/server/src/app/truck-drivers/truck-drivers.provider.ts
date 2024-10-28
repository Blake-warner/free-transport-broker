import { DataSource } from "typeorm";
import { TruckDriver } from "./truck-driver.entity";

export const truckDriversProvider = [
    {
        provide: 'TRUCK_DRIVERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(TruckDriver),
        inject: ['DATA_SOURCE'],
    },
]