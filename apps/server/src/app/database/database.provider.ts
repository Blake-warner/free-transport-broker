import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { VerifyEmail } from '../auth/verify-email/verify-email.entity';
import { TruckProvider } from '../truck-providers/entities/truck-provider.entity';
import { Truck } from '../truck-providers/entities/truck.entity';
import { Material } from '../truck-providers/entities/material.entity';
import databaseConfig from './config';
import { ConfigType } from '@nestjs/config';
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
                    __dirname + '/../**/*.entity{.ts,.js}',
                    User,
                    VerifyEmail,
                    TruckProvider,
                    Truck,
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