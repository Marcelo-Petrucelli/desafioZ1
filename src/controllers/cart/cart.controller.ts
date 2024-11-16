import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, ForbiddenException, Get, HttpCode, HttpStatus, NotAcceptableException, ParseBoolPipe, Post, Query, Req, UnprocessableEntityException, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth/auth.jwtAuth.guard';
import { DBService } from 'src/services/main/main.database.service';
import { User } from 'src/entities/user.entity';
import { Cart } from 'src/entities/cart.entity';
import { CartRepository } from 'src/entities/cart.repository';
import { GetCartDTO } from 'src/dtos/cart/get.cart.dto';
import { AlterCartDTO } from 'src/dtos/cart/alter.cart.dto';
import { CreateCartDTO } from 'src/dtos/cart/create.cart.dto';
import { Request } from 'express';
import { ref } from '@mikro-orm/core';

@Controller('cart')
export class CartController {

  private readonly cartRepo: CartRepository;
  constructor(private dbService: DBService){
    this.cartRepo = this.dbService.em.getRepository(Cart);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postCreateCart(@Req() req : Request, @Body(ValidationPipe) createCartDTO: CreateCartDTO, @Query('force', new DefaultValuePipe(false), new ParseBoolPipe({ optional: true })) force?: boolean) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }
    const cart = await ref(user.cart)?.load();
    if(!force && cart){
      throw new NotAcceptableException("User already has a cart. Exclude the current one or force a new one.");
    }

    if(cart){
      cart.cartItem.removeAll(); //CartItem is marked with orphanRemoval, setting to null removes orphans
      await this.dbService.em.persistAndFlush(cart);
      this.dbService.em.remove(cart);
    }
    await this.cartRepo.createCartFromDTO(user, createCartDTO);
    await this.dbService.em.flush();
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  //TODO - Possivelmente alterar o AlterCartDTO para algo como AlterCartItemDTO[], para facilitar inserções multiplas (com quantidade e não repetição)
  async postAddProductToCart(@Req() req : Request, @Body(ValidationPipe) alterCartDTO: AlterCartDTO) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }

    if(alterCartDTO.id){
      const cart = await this.cartRepo.findOne(alterCartDTO.id);
      if(!cart){
        throw new BadRequestException(`Unable to find cart with id ${alterCartDTO.id}!`);
      } else {
        await this.cartRepo.addProductIdsToCart(cart, alterCartDTO);
      }
    } else {
      const userCart = await ref(user.cart)?.load();
      if(!userCart){
        const newCartDTO = new CreateCartDTO();
        newCartDTO.ownerId = user.id;
        newCartDTO.discount = 0;
        newCartDTO.productIds = alterCartDTO.productIds;
  
        await this.cartRepo.createCartFromDTO(user, newCartDTO);
      } else {
        await this.cartRepo.addProductIdsToCart(userCart, alterCartDTO); //Doesnt auto flush
      }
    }
    await this.dbService.em.flush();
  }

  @Delete('remove')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGuard)
  //TODO - Possivelmente alterar o AlterCartDTO para algo como AlterCartItemDTO[], para facilitar remoções multiplas (com quantidade e não repetição)
  async postRemoveProductFromCart(@Req() req : Request, @Body(ValidationPipe) alterCartDTO: AlterCartDTO) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }

    if(alterCartDTO.id){
      const cart = await this.cartRepo.findOne(alterCartDTO.id);
      if(!cart){
        throw new BadRequestException(`Unable to find cart with id ${alterCartDTO.id}!`);
      } else {
        await this.cartRepo.removeProductIdsFromCart(cart, alterCartDTO);
      }
    } else {
      const userCart = await ref(user.cart)?.load();
      if(!userCart){
        throw new BadRequestException("User doesn't have a cart to remove products from.");
      }
      await this.cartRepo.removeProductIdsFromCart(userCart, alterCartDTO); //Doesnt auto flush
    }
    await this.dbService.em.flush();    
  }

  @Post('placeOrder')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postPlaceOrder() {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getCart(@Req() req : Request) {
    const user = req.user! as User;
    if(!user){
      throw ForbiddenException;
    }
    const cart = await ref(user.cart)?.load();
    if(!cart){
      throw new UnprocessableEntityException("This user doesn't have a cart.");
    }
    await cart.cartItem.load(); //We need to ensure cart.cartItem is initialized before processing it
    return GetCartDTO.from(cart);
  }

}
