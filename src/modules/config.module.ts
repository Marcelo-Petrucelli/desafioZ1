import { Global, Module } from '@nestjs/common';
import { ConfigService, DevelopmentConfigService, ProductionConfigService } from '../services/main/main.config.service';

const configServiceProvider = {
  provide: ConfigService,
  useClass:
    (process.env.NODE_ENV != undefined && (process.env.NODE_ENV as string).trim() === 'development')
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Global()
@Module({
  providers: [ configServiceProvider ],
  exports: [ configServiceProvider ]
})

export class ConfigModule {};
