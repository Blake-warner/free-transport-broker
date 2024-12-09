import { DataSource } from "typeorm";
import { Provider } from "./entities/provider.entity";
import { ProviderTrucks } from "./entities/provider-trucks.entity";
import { ProviderMaterials } from "./entities/provider-materials.entity";

export const truckDriversProvider = [
    {
        provide: 'TRUCK_DRIVERS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Provider),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROVIDER_TRUCKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProviderTrucks),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROVIDER_MATERIALS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProviderMaterials),
        inject: ['DATA_SOURCE'],
    }
]