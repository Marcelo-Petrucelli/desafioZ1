import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from '../../src/controllers/main.controller';
import { DBService } from '../../src/services/main/main.database.service';
import { ConfigService } from '../../src/services/main/main.config.service';
import { ConfigModule } from '../../src/modules/config.module';

describe('MainController', () => {
  let mainController: MainController;
  let dbService: DBService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MainController],
      providers: [
        {
          provide: DBService,
          useFactory: async (configProvider: ConfigService) => {
            const dbServ = new DBService(configProvider);
            await dbServ.connect();
            return dbServ;
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule]
    })
    .compile();

    dbService = moduleRef.get(DBService);
    mainController = moduleRef.get(MainController);
  });

  it('MainController should be defined', () => {
    expect(mainController).toBeDefined();
  });
});
