import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from 'src/modules/main.module';
import { ConfigService } from 'src/services/main/main.config.service';
import { DBService } from 'src/services/main/main.database.service';
import helmet from 'helmet';

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  /*, {
    bufferLogs: true,
  }*/

  const dbService = app.get(DBService);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.use(dbService.createContext.bind(dbService));

  //TODO - Think about csrf attacks (maybe use package csrf-csrf as middleware?)

  //TODO - Create custom LoggerService using ConfigService for logs and add it here
  //app.useLogger(app.get(LoggerService));

  app.enableShutdownHooks();

  const port = configService.props.HOST_PORT
  await app.listen(port);
})();