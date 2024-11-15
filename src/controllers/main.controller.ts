import { Controller, Get, Param, ParseBoolPipe, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DBService } from 'src/services/main/main.database.service';

@Controller()
export class MainController {

  constructor(private dbService: DBService){}

  @Get()
  getIndex(@Req() req: Request) {}
  
  @Get('forceSchemaRefresh')
  async getdefaultForceSchemaRefresh(@Res() res: Response) {
    return res.redirect('forceSchemaRefresh/false');
  }
  
  @Get('forceSchemaRefresh/:force') //Only for debugging or cleaning DB
  async getForceSchemaRefresh(@Param('force', ParseBoolPipe) force: boolean) {
    const migrator = this.dbService.orm.getMigrator();

    if(force || (await migrator.getExecutedMigrations()).length <= 0){
      await this.dbService.orm.schema.refreshDatabase();
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
