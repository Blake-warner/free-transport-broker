import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import * as CONSTANTS from './app/shared/constants';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(CONSTANTS.globalPrefix);
  const version = '/v1';
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
   // Serve uploaded files
   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${CONSTANTS.globalPrefix}${version}`
  );
}

bootstrap();
