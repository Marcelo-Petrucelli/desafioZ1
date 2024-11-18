import { Global, Module } from '@nestjs/common';
import { ConfigService } from '../services/main/main.config.service';
import { ConfigModule } from '../modules/config.module';
import { AuthService } from '../services/main/main.auth.service';
import { DatabaseModule } from '../modules/database.module';
import { BasicStrategy } from '../services/auth/auth.basicstrategy.service';
import { JwtStrategy } from '../services/auth/auth.jwtstrategy.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.props.JWT_KEY,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ AuthService, BasicStrategy, JwtStrategy ],
  exports: [ AuthService ]
})

export class AuthModule {};
