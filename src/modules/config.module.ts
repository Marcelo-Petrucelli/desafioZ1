import { Global, Module } from '@nestjs/common';
import { ConfigService, DevelopmentConfigService, ProductionConfigService } from 'src/services/main/main.config.service';

const configServiceProvider = {
  provide: ConfigService,
  useClass:
    (process.env.NODE_ENV as String).trim() === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Global()
@Module({
  providers: [ configServiceProvider ],
  exports: [ configServiceProvider ]
})

export class ConfigModule {}
