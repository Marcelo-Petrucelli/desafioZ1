import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DBService } from 'src/services/main/main.database.service';
import { AuthService } from 'src/services/main/main.auth.service';
import { ConfigService } from 'src/services/main/main.config.service';
import { JWTPayloadDTO } from 'src/dtos/auth.jwtpayload.dto';
import { User } from 'src/entities/user.entity';

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