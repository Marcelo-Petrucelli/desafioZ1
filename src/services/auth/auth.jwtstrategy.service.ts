import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../main/main.auth.service';
import { ConfigService } from '../main/main.config.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.props.JWT_KEY,
    });
  }

  async validate(payload: any) : Promise<User> { //Passport will build an object and set it in the Request
    if(!payload.userId || !payload.userEmail){
      throw new UnauthorizedException();
    }

    const user = await this.authService.findAuthUser({srcId: payload.userId, srcEmail: payload.userEmail});
    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}