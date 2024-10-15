import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
//import { ConfigModule } from '@nestjs/config';
//import jwtConfig from './config/jwt.config';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { verifyEmailProviders } from './verify-email/verify-email.provider';

@Module({
    imports: [
        DatabaseModule, 
        SharedModule, 
        UserModule,
        //ConfigModule.forFeature(jwtConfig),
    ],
    providers: [
        VerifyEmailService, 
        ...verifyEmailProviders,
    ]
})

export class AuthModule {}
