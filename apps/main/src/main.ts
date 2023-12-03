import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from '../../../utils/config';
import { documentation } from 'utils/documentation';
import { ValidationPipe } from '@nestjs/common';

const { MAIN_PORT } = Environment;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  documentation(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(MAIN_PORT);
}
bootstrap();
