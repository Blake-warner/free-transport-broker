import { DataSource } from 'typeorm';
import { User } from '../user/user.entity';
import { VerifyEmail } from '../verify-email/verify-email.entity';
import { ConfigService } from '@nestjs/config';
import { DatabaseTypes } from './database-types.enum';

//const configService: ConfigService = @Inject(ConfigService);

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: configService.get<DatabaseTypes.MYSQL>('DATABASE_TYPE'),
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                    User,
                    VerifyEmail,
                ],
                synchronize: true,
            });
            return dataSource.initialize();
        },
        inject: [ConfigService]
    }
]