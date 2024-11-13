import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import helmet from 'helmet';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  app.use(helmet());
  //TODO - Think about csrf attacks (maybe use package csrf-csrf as middleware?)
  
  await app.listen(process.env.HOST_PORT ?? 5000);
})();