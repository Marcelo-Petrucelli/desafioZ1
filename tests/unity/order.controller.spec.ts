import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../src/controllers/order/order.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigModule } from '../../src/modules/config.module';
import { DatabaseModule } from '../../src/modules/database.module';
import { JwtAuthGuard } from '../../src/guards/auth/auth.jwtAuth.guard';
import { MockJwtAuthGuard } from '../guards/auth/mock.auth.jwtAuth.guard';

describe('OrderController', () => {
  let orderController: OrderController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      controllers: [OrderController]
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

    dbService = moduleRef.get(DBService);
    orderController = moduleRef.get(OrderController);
  });

  it('OrderController should be defined', () => {
    expect(orderController).toBeDefined();
  });
});
