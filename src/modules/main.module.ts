import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '../modules/config.module';
import { SecurityModule } from '../modules/secutiry.module';
import { DatabaseModule } from '../modules/database.module';
import { AuthModule } from '../modules/auth.module';

import { MainController } from '../controllers/main.controller';
import { AuthController } from '../controllers/auth/auth.controller';
//import { UserController } from '../controllers/user/user.controller';
import { AddressController } from '../controllers/address/address.controller';
import { ProductController } from '../controllers/product/product.controller';
import { CartController } from '../controllers/cart/cart.controller';
import { OrderController } from '../controllers/order/order.controller';

@Module({
  imports: [
    ConfigModule,
    SecurityModule,
    DatabaseModule,
    AuthModule
  ],
  controllers: [MainController, AuthController/*, UserController*/, AddressController, ProductController, CartController, OrderController],
})

export class MainModule {};
