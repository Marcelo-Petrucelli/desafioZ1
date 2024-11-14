import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { BasicAuthGuard } from 'src/guards/auth/auth.localAuth.guard';
import { AuthService } from 'src/services/main/main.auth.service';

@Controller()
export class MainController {

  constructor(private authService: AuthService) {}

  @UseGuards(BasicAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    //TODO - Check if not already loggedIn, if so forward this request to another controller
    const token = this.authService.loginUser(req.user as User);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Req() req: Request) {
    return req.logout(() => {});
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }  
}
