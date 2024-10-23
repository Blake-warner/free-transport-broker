import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as CONSTANTS from './app/shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(CONSTANTS.globalPrefix);
  const version = '/v1';
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true
})
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${CONSTANTS.globalPrefix}${version}`
  );
}

bootstrap();
