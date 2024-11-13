import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './modules/main.module';
import helmet from 'helmet';
import { ConfigService } from './services/main/main.config.service';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  /*, {
    bufferLogs: true,
  }*/

  app.use(helmet());

  //TODO - Think about csrf attacks (maybe use package csrf-csrf as middleware?)

  //TODO - Create custom LoggerService using ConfigService for logs and add it here
  //app.useLogger(app.get(LoggerService));

  const port = app.get(ConfigService).props.HOST_PORT
  await app.listen(port);
})();