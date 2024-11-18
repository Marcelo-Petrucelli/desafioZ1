import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/controllers/auth/auth.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigModule } from '../../src/modules/config.module';
import { AuthModule } from '../../src/modules/auth.module';
import { DatabaseModule } from '../../src/modules/database.module';
import { JwtAuthGuard } from '../../src/guards/auth/auth.jwtAuth.guard';
import { MockJwtAuthGuard } from '../guards/auth/mock.auth.jwtAuth.guard';

describe('AuthController', () => {
  let authController: AuthController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, AuthModule],
      controllers: [AuthController]
    })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

    dbService = moduleRef.get(DBService);
    authController = moduleRef.get(AuthController);
  });

  it('AuthController should be defined', () => {
    expect(authController).toBeDefined();
  });
});
