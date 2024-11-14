import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from 'src/modules/config.module';
import { SecurityModule } from 'src/modules/secutiry.module';
import { DatabaseModule } from 'src/modules/database.module';
import { AuthModule } from 'src/modules/auth.module';

import { MainController } from 'src/controllers/main.controller';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { ProductController } from 'src/controllers/products/products.controller';

@Module({
  imports: [
    ConfigModule,
    SecurityModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [MainController, AuthController, ProductController],
})

export class MainModule {};
