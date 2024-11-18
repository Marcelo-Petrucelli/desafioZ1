import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../../src/controllers/cart/cart.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigModule } from '../../src/modules/config.module';
import { DatabaseModule } from '../../src/modules/database.module';
import { JwtAuthGuard } from '../../src/guards/auth/auth.jwtAuth.guard';
import { MockJwtAuthGuard } from '../guards/auth/mock.auth.jwtAuth.guard';

describe('CartController', () => {
  let cartController: CartController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      controllers: [CartController]
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

    dbService = moduleRef.get(DBService);
    cartController = moduleRef.get(CartController);
  });

  it('CartController should be defined', () => {
    expect(cartController).toBeDefined();
  });
});
