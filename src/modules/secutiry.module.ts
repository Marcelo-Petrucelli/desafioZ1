import { Global, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '../modules/config.module';

const securityServiceProvider = {
  provide: 'MAIN_RATE_LIMIT',
  useClass: ThrottlerGuard
};

@Global()
@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot([{ //TODO - Change to async and load CONFIG through .env
      ttl: 60000,
      limit: 100,
    }])
  ],
  providers: [ securityServiceProvider ],
  exports: [ securityServiceProvider ]
})

export class SecurityModule {};