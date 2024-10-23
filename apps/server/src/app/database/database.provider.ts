import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { VerifyEmail } from '../auth/verify-email/verify-email.entity';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',  
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'ftb',
                entities: [
                    //__dirname + '/../**/*.entity{.ts,.js}',
                    User,
                    VerifyEmail,
                ],
                ssl: false,
                synchronize: true,
                logging: true,
            });
            return await dataSource.initialize();
        },
    }
]