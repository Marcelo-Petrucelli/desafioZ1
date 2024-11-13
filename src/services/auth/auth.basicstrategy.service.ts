import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../main/main.auth.service';
import { BasicStrategy as BStrategy } from 'passport-http';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BasicStrategy extends PassportStrategy(BStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string) : Promise<User> {  //Passport will build an object and set it in the Request
    const user = await this.authService.validateUser(email, password);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}