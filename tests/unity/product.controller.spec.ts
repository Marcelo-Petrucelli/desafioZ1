import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/controllers/product/product.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigModule } from '../../src/modules/config.module';
import { DatabaseModule } from '../../src/modules/database.module';
import { JwtAuthGuard } from '../../src/guards/auth/auth.jwtAuth.guard';
import { MockJwtAuthGuard } from '../guards/auth/mock.auth.jwtAuth.guard';

describe('ProductController', () => {
  let productController: ProductController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      controllers: [ProductController],
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

    dbService = moduleRef.get(DBService);
    productController = moduleRef.get(ProductController);
  });

  it('ProductController should be defined', () => {
    expect(productController).toBeDefined();
  });
});
