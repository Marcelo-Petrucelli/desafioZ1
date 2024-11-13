import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { MainController } from './controllers/products/main.controller';

import { DBService } from './services/main.database';
import { ConfigService, DevelopmentConfigService, ProductionConfigService } from './services/main.config';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
  ],
  controllers: [MainController],
  providers: [
    {
      provide: 'MAIN_RATE_LIMIT',
      useClass: ThrottlerGuard
    },
    {
      provide: ConfigService,
      useClass:
        (process.env.NODE_ENV as String).trim() === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    {
      provide: 'DB_SERVICE',
      useFactory: async (configProvider: ConfigService) => {
        const dbServ = new DBService(configProvider);
        await dbServ.connect();
        return dbServ;
      },
      inject: [ConfigService],
    }
  ],
})

export class MainModule {}
