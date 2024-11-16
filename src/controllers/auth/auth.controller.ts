import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { BasicAuthGuard } from 'src/guards/auth/auth.localAuth.guard';
import { AuthService } from 'src/services/main/main.auth.service';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(BasicAuthGuard)
  async login(@Req() req: Request) {
    return this.authService.loginUser(req.user as User);
  }

  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    return req.logout(() => {});
  }
  
}
