import { Controller, DefaultValuePipe, Get, ParseBoolPipe, Query, Req } from '@nestjs/common';
import { DBService } from 'src/services/main/main.database.service';

@Controller()
export class MainController {

  constructor(private dbService: DBService){}

  @Get()
  getIndex() {}
  
  @Get('forceSchemaRefresh') //Only for debugging or cleaning DB
  async getForceSchemaRefresh(@Query('force', new DefaultValuePipe(false), new ParseBoolPipe({ optional: true })) force?: boolean) {
    const migrator = this.dbService.orm.getMigrator();

    if(force || (await migrator.getExecutedMigrations()).length <= 0){
      await this.dbService.orm.schema.refreshDatabase({
        ensureIndexes: false,
        dropDb: true
      });
      await migrator.down({ to: 0 });
      await migrator.up({ to: 'initial.migration' });

      return {
        message: 'Database refreshed and InitialMigration executed.'
      }
    }
    return {
      message: 'Database was not altered.'
    }
  }
}
