import { DataSource } from "typeorm";
import { Truck } from "./truck.entity";

export const trucksProvider = [
    {
        provide: 'TRUCKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Truck),
        inject: ['DATA_SOURCE'],
    },
]