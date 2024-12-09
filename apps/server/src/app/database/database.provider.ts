import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { VerifyEmail } from '../auth/verify-email/verify-email.entity';
import { Provider } from '../providers/entities/provider.entity';
import { Truck } from '../trucks/truck.entity';
import { Material } from '../materials/material.entity';

import databaseConfig from './config';
import { ConfigType } from '@nestjs/config';
import { ProviderTrucks } from '../providers/entities/provider-trucks.entity';
import { ProviderMaterials } from '../providers/entities/provider-materials.entity';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',  
        useFactory: async (config: ConfigType<typeof databaseConfig>) => {
            const dataSource = new DataSource({
                type: config.type,
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.name,
                entities: [
                    VerifyEmail,
                    Provider,
                    Truck,
                    ProviderTrucks,
                    ProviderMaterials,
                    User,
                    Material
                ],
                ssl: false,
                synchronize: true,
                logging: true,
            });
            return await dataSource.initialize();
        },
        inject: [databaseConfig.KEY]
    }
]