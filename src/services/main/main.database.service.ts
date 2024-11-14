import { BeforeApplicationShutdown, Injectable } from '@nestjs/common';
import { Options, MySqlDriver, MikroORM, EntityManager, RequestContext } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

import { ConfigService } from './main.config.service';
import { NextFunction } from 'express';

@Injectable()
export class DBService implements BeforeApplicationShutdown {
  public orm!: MikroORM;
  public em!: EntityManager;

  private readonly configService: ConfigService;
  private readonly dbOptions: Options;

  constructor(configService: ConfigService) {
    this.configService = configService;

    this.dbOptions = {
      driver: MySqlDriver,
      dbName: this.configService.props.DB_NAME,
      user: this.configService.props.DB_USER,
      host: this.configService.props.DB_HOST,
      port: this.configService.props.DB_PORT,
      password: this.configService.props.DB_PW,
      charset: 'utf8mb4',
      
      entities: ['./dist/entities/*.entity.js'],
      entitiesTs: ['src/entities/*.entity.ts'],

      extensions: [Migrator],
      migrations: {
        tableName: 'orm_migrations',
        path: 'dist/migrations',
        pathTs: 'src/migrations',
      },

      // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
      // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
      metadataProvider: TsMorphMetadataProvider,

      // enable debug mode to log SQL queries and discovery information
      debug: this.configService.devMode,
    };
  }

  public async connect(){
    this.orm = await MikroORM.init(this.dbOptions);
    this.em = this.orm.em;
  }

  public async createContext(req: Request, res: Response, next: NextFunction){
    RequestContext.create(this.em, next);
  }

  beforeApplicationShutdown(signal: string) {
    this.orm.close();
  }
}