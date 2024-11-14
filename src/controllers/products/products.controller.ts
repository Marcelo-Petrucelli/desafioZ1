import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { Request } from 'express';

@Controller('product')
export class ProductController {

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Req() req: Request) {
    return req.user;
  }

}
