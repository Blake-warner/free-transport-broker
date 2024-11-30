import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { verifyEmailProviders } from './verify-email/verify-email.provider';
import { AuthService } from './auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth.controller';
import { HashingService } from './hashing/hashing.service';
import { MailService } from './mailer/mailer.service';
import { GoogleAuthenticationService } from './social/google-authentication.service';
import { GoogleAuthenticationController } from './social/google-authentication.controller';

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
    MailService,
    GoogleAuthenticationService,
  ],
  controllers: [AuthController, GoogleAuthenticationController],
})
export class AuthModule {}
