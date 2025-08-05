import sdk from './tracer';
sdk.start();

import { NestFactory } from '@nestjs/core';
import { log } from 'src/infra/logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3001).then(() => {
    log.info('TESTE');
  });
}

bootstrap();
