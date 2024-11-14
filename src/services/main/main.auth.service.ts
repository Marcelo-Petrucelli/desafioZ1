import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { DBService } from 'src/services/main/main.database.service';
import { JWTPayloadDTO } from 'src/dtos/auth/auth.jwtpayload.dto';
import { ConfigService } from './main.config.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DBService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async findAuthUser({srcId, srcEmail}: {srcId?: number, srcEmail?: string}) : Promise<User | null> {
    if(!srcId && !srcEmail){
      return null;
    }

    if(!srcId){
      //await this.dbService.findOneByEmail(srcEmail);
    } else {
      //await this.dbService.findOneById(srcId);
    }

    const temp = new User();
    temp.id = srcId ?? 10;
    temp.fullName = "Marcelo Test",
    temp.email = srcEmail ?? 'test@test.com';
    return temp; //Change here
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findAuthUser({srcEmail: email});
    if(!user){
      return null;
    }

    //const match = await bcrypt.compare(pass, user.password);
    /*if (!match) {
      return null;
    }*/

    return user;
  }

  async loginUser(foundUser: User) {
    const payload = JWTPayloadDTO.fromData({
      sub: foundUser.id,
      iss: this.configService.props.JWT_ISSUER,
      aud: this.configService.props.JWT_AUDIENCE,
      duration: this.configService.props.JWT_DURATION,
      email: foundUser.email,
      fullName: foundUser.fullName
    });

    const token = await this.jwtService.signAsync(payload.toObject());
    return { access_token: token };
  }
}