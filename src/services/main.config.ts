import { Injectable } from '@nestjs/common';
import * as DotEnv from 'dotenv';

export interface ConfigProps {
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_USER: string;
  readonly DB_PW: string;
  readonly DB_NAME: string;

  //private readonly HOST_ADDRESS: string;
  readonly HOST_PORT?: number;

  readonly JWT_KEYSTORE_QNT: number;
  readonly JWT_KEY_SIZE: number;
  readonly JWT_ISSUER: string;
  readonly JWT_AUDIENCE: string;
  readonly JWT_DURATION: number;

  //readonly LOG_PATH: string;

  //readonly SSL_KEY_PATH: string;
  //readonly SSL_CERT_PATH: string;
}

@Injectable()
export class ConfigService {
  public readonly props: ConfigProps;
  public readonly devMode: boolean;

  constructor(envOptions: DotEnv.DotenvConfigOptions = { path: '.env.dev' }, isDev: boolean = true) { //Defaults to DEV
    DotEnv.config(envOptions);

    console.log(envOptions);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PW);
    console.log(process.env.DB_NAME);

    this.devMode = isDev;
    this.props = {
        DB_HOST: 			process.env.DB_HOST as string,
        DB_PORT: 			parseInt(process.env.DB_PORT as string),
        DB_USER: 			process.env.DB_USER as string,
        DB_PW: 				process.env.DB_PW as string,
        DB_NAME: 			process.env.DB_NAME as string,

        //HOST_ADRESS: 		process.env.HOST_ADRESS as string,
        HOST_PORT: 			parseInt(process.env.HOST_PORT as string),

        JWT_KEYSTORE_QNT: 	parseInt(process.env.JWT_KEYSTORE_QNT as string),
        JWT_KEY_SIZE: 		parseInt(process.env.JWT_KEY_SIZE as string),
        JWT_ISSUER: 		process.env.JWT_ISSUER as string,
        JWT_AUDIENCE: 		process.env.JWT_AUDIENCE as string,
        JWT_DURATION: 		parseInt(process.env.JWT_DURATION as string),

        //LOG_PATH:           process.env.LOG_PATH as string,
        
        //SSL_KEY_PATH:       process.env.SSL_KEY as string,
        //SSL_CERT_PATH:	    process.env.SSL_CERT as string,
    };
  }
}

@Injectable()
export class DevelopmentConfigService extends ConfigService {
  constructor() {
    super();
  }
}

@Injectable()
export class ProductionConfigService extends ConfigService {
    constructor() {
      super({ path: '.env.prod' }, false);
    }
}