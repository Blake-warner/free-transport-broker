import { DataSource } from "typeorm";
import { Material } from "./material.entity";

export const materialsProvider = [
    {
        provide: 'MATERIALS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Material),
        inject: ['DATA_SOURCE'],
    },
]