import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from 'src/modules/config.module';
import { SecurityModule } from 'src/modules/secutiry.module';
import { DatabaseModule } from 'src/modules/database.module';
import { AuthModule } from 'src/modules/auth.module';

import { MainController } from 'src/controllers/main.controller';
import { AuthController } from 'src/controllers/auth/auth.controller';
//import { UserController } from 'src/controllers/user/user.controller';
import { AddressController } from 'src/controllers/address/address.controller';
import { ProductController } from 'src/controllers/products/products.controller';
import { CartController } from 'src/controllers/cart/cart.controller';

@Module({
  imports: [
    ConfigModule,
    SecurityModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [MainController, AuthController/*, UserController*/, AddressController, ProductController, CartController],
})

export class MainModule {};
