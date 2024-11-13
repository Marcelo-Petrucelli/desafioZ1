import { Module } from '@nestjs/common';
import { MainController } from 'src/controllers/products/main.controller';
import { ConfigService, DevelopmentConfigService, ProductionConfigService } from 'src/services/main/main.config.service';
import { ConfigModule } from './config.module';
import { SecurityModule } from './secutiry.module';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule,
    SecurityModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [MainController],
})

export class MainModule {}
