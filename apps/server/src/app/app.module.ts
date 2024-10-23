import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './auth/mailer/mailer.module';

@Module({
  imports: [
    EventEmitterModule,
    DatabaseModule,
    SharedModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
