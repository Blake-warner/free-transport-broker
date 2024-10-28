import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { verifyEmailProviders } from './verify-email/verify-email.provider';
import { AuthService } from './auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { HashingService } from './hashing/hashing.service';
import { MailService } from './mailer/mailer.service';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    UserModule,
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    VerifyEmailService,
    ...verifyEmailProviders,
    ConfigService,
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    MailService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
