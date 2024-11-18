import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DBService } from '../../services/main/main.database.service';
import { JWTPayloadDTO } from '../../dtos/auth.jwtpayload.dto';
import { ConfigService } from '../../services/main/main.config.service';
import { Session } from '../../entities/session.entity';
import { User } from '../../entities/user.entity';
import { ref } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DBService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const userRepo = this.dbService.em.getRepository(User);
    const user = await userRepo.findUserByIdOrEmail({srcEmail: email});
    if(!user){
      return null;
    }

    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      return null;
    }

    return user;
  }

  async loginUser(user: User) {
    const existingSession = await user.session?.load();
    if(existingSession){
      return { access_token: existingSession.token };
    }

    const payload = JWTPayloadDTO.fromData({
      sub: user.id,
      iss: this.configService.props.JWT_ISSUER,
      aud: this.configService.props.JWT_AUDIENCE,
      duration: this.configService.props.JWT_DURATION * 1000,
      email: user.email,
      fullName: user.fullName
    });

    const token = await this.jwtService.signAsync(payload.toObject());

    const em = this.dbService.em;

    let session: Session;
    if(!existingSession){
      session = em.create(Session, {
        token: token,
        endingAt: new Date(payload.exp),
        user: user,
      });

      user.session = ref(session);
    } else {
      session = existingSession;
      session.token = token;
      session.endingAt = new Date(payload.exp);
    }
    
    em.persist(session);
    em.persist(user);
    await em.flush();

    return { access_token: token };
  }
}