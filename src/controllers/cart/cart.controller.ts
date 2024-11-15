import { Controller, ForbiddenException, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { User } from 'src/entities/user.entity';
import { Cart } from 'src/entities/cart.entity';
import { CartRepository } from 'src/entities/cart.repository';
import { Request } from 'express';

@Controller('cart')
export class CartController {

  private readonly cartRepo: CartRepository;
  constructor(private dbService: DBService){
    this.cartRepo = this.dbService.em.getRepository(Cart);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getCart(@Req() req : Request) {
    if(!req.user){
      throw ForbiddenException;
    }
    return new CartDTO.from((req.user! as User).cart);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async postCreateCart(@Req() req: Request) {
    return req.user;
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async postAddProductToCart(@Req() req: Request) {
    return req.user;
  }

  @Post('/remove')
  @UseGuards(JwtAuthGuard)
  async postRemoveProductFromCart(@Req() req: Request) {
    return req.user;
  }

  @Post('/place')
  @UseGuards(JwtAuthGuard)
  async postPlaceOrder(@Req() req: Request) {
    return req.user;
  }

}
