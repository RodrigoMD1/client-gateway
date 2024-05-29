import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {

  const logger = new Logger('Main-Gateway')


  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  app.setGlobalPrefix('api')

  await app.listen(envs.port);

  logger.log(`gateway running on port ${envs.port}`);

}
bootstrap();
