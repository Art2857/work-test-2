import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Environment } from 'utils/config';
import { documentation } from 'utils/documentation';

const { AUTH_PORT } = Environment;

async function bootstrap() {
  const app = await NestFactory.create(AuthModule.forRoot());

  documentation(app);

  await app.listen(AUTH_PORT);
}
bootstrap();
