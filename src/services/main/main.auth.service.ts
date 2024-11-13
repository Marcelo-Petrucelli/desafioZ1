import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { DBService } from 'src/services/main/main.database.service';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DBService, private readonly jwtService: JwtService) {}

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

  async login(user: User) { //Change this to our model? Using 'any' is usually not good.
    //new JWTPayloadDTO();
    const payload = {
      userID: user.id,
      userEmail: user.email, 
      userFullName: user.fullName
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}