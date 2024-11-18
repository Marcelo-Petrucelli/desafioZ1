import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DBService } from '../../services/main/main.database.service';
import { AuthService } from '../../services/main/main.auth.service';
import { ConfigService } from '../../services/main/main.config.service';
import { JWTPayloadDTO } from '../../dtos/auth.jwtpayload.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly dbService: DBService,
    private readonly authService: AuthService, 
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.props.JWT_KEY,
    });
  }

  async validate(payload: any) : Promise<User> { //Passport will build an object and set it in the Request
    const authPayload = JWTPayloadDTO.fromPayload(payload);
    if(!authPayload){
      throw new UnauthorizedException();
    }

    const userRepo = this.dbService.em.getRepository(User);
    const user = await userRepo.findUserByIdOrEmail({srcId: authPayload.user.id, srcEmail: authPayload.user.email});
    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}