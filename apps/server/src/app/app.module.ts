import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EventEmitterModule,
    DatabaseModule,
    SharedModule,
    UserModule,
    ConfigModule.forRoot({
      cache: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, VerifyEmailService],
})
export class AppModule {}
