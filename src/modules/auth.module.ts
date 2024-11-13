import { Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/services/main/main.config.service';
import { ConfigModule } from 'src/modules/config.module';
import { AuthService } from 'src/services/main/main.auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database.module';
import { BasicStrategy } from 'src/services/auth/auth.basicstrategy.service';
import { JwtStrategy } from 'src/services/auth/auth.jwtstrategy.service';

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

export class AuthModule {}
