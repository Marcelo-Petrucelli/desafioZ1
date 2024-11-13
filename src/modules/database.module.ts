import { Global, Module } from '@nestjs/common';
import { DBService } from 'src/services/main/main.database.service';
import { ConfigService } from 'src/services/main/main.config.service';
import { ConfigModule } from './config.module';

const databaseServiceProvider = {
  provide: DBService,
  useFactory: async (configProvider: ConfigService) => {
    const dbServ = new DBService(configProvider);
    await dbServ.connect();
    return dbServ;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ databaseServiceProvider ],
  exports: [ databaseServiceProvider ]
})

export class DatabaseModule {}
