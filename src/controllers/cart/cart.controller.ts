import { BadRequestException, Body, Controller, DefaultValuePipe, ForbiddenException, Get, HttpCode, HttpStatus, NotAcceptableException, Param, ParseBoolPipe, Post, Req, Res, UnprocessableEntityException, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { User } from 'src/entities/user.entity';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { CartRepository } from 'src/entities/cart.repository';
import { CartItemRepository } from 'src/entities/cartItem.repository';
import { ProductRepository } from 'src/entities/product.repository';
import { CartDTO } from 'src/dtos/cart.dto';
import { Request, Response } from 'express';
import { ref } from '@mikro-orm/core';

@Controller('cart')
export class CartController {

  private readonly cartRepo: CartRepository;
  constructor(private dbService: DBService){
    this.cartRepo = this.dbService.em.getRepository(Cart);
  }

  @Post(['create/:force', 'create'])
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postCreateCart(@Req() req : Request, @Body(ValidationPipe) cartDTO: CartDTO, @Param('force', new DefaultValuePipe(false), new ParseBoolPipe({ optional: true })) force?: boolean) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }
    const cart = await ref(user.cart)?.load();
    if(force || !cart){
      if(cart){
        cart.cartItem.removeAll(); //CartItem is marked with orphanRemoval, setting to null removes orphans
        await this.dbService.em.persistAndFlush(cart);
        this.dbService.em.remove(cart);
      }
      await this.cartRepo.createCartFromDTO(user, cartDTO);
      await this.dbService.em.flush();
    } else {
      throw new NotAcceptableException("User already has a cart. Exclude the current one or force a new one.");
    }
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async postAddProductToCart(@Req() req : Request, @Body(ValidationPipe) productIds: number[]) {  //TODO - @Param('id', ProductsByIdsPipe) products: productEntity[]
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }
    const cart = await ref(user.cart)?.load();
    if(!cart){
      const newCartDTO = new CartDTO();
      newCartDTO.ownerId = user.id;
      newCartDTO.discount = 0;
      newCartDTO.productIds = productIds;

      await this.cartRepo.createCartFromDTO(user, newCartDTO);
    } else {
      this.cartRepo.addProductIdsToCart(cart, productIds); //Doesnt auto flush
    }
    await this.dbService.em.flush();
  }

  @Post('remove')
  @UseGuards(JwtAuthGuard)
  async postRemoveProductFromCart() {
  }

  @Post('placeOrder')
  @UseGuards(JwtAuthGuard)
  async postPlaceOrder() {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@Req() req : Request) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }
    const cart = ref(user.cart)?.get();
    if(!cart){
      throw new UnprocessableEntityException("This user doesn't have a cart.");
    }
    return CartDTO.from(cart);
  }

}
