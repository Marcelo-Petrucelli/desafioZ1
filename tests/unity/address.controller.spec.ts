import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from '../../src/controllers/address/address.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigModule } from '../../src/modules/config.module';
import { DatabaseModule } from '../../src/modules/database.module';
import { JwtAuthGuard } from '../../src/guards/auth/auth.jwtAuth.guard';
import { MockJwtAuthGuard } from '../guards/auth/mock.auth.jwtAuth.guard';

describe('AddressController', () => {
  let addressController: AddressController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule],
      controllers: [AddressController]
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

    dbService = moduleRef.get(DBService);
    addressController = moduleRef.get(AddressController);
  });

  it('AddressController should be defined', () => {
    expect(addressController).toBeDefined();
  });
});
