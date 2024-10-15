import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { VerifyEmail } from '../auth/verify-email/verify-email.entity';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',  
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',//configService.get<DatabaseTypes.MYSQL>('DATABASE_TYPE'),
                host: 'localhost', //configService.get<string>('DATABASE_HOST'),
                port: 3306,  //configService.get<number>('DATABASE_PORT'),
                username: 'root', //configService.get<string>('DATABASE_USERNAME'),
                password: 'root', //configService.get<string>('DATABASE_PASSWORD'),
                database: 'free_transport_broker', //configService.get<string>('DATABASE_NAME'),
                entities: [
                   // __dirname + '/../**/*.entity{.ts,.js}',
                    User,
                    VerifyEmail,
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    }
]