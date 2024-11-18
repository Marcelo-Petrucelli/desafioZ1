import { Body, Controller, DefaultValuePipe, ForbiddenException, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, Req, UnprocessableEntityException, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth/auth.jwtAuth.guard';
import { DBService } from '../../services/main/main.database.service';
import { User } from '../../entities/user.entity';
import { Order } from '../../entities/order.entity';
import { OrderRepository } from '../../entities/order.repository';
import { GetOrderDTO } from '../../dtos/order/get.order.dto';
import { PlaceOrderDTO } from '../../dtos/order/place.order.dto';
import { Request } from 'express';
import { ref } from '@mikro-orm/core';

@Controller('order')
export class OrderController {

  private readonly orderRepo: OrderRepository;
  constructor(private dbService: DBService){
    this.orderRepo = this.dbService.em.getRepository(Order);
  }
  
  @Post('place')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async postPlaceOrder(@Req() req : Request, @Body(ValidationPipe) placeOrderDTO: PlaceOrderDTO) {
    const user = req.user! as User;
    if(!user){
      throw new ForbiddenException(`Token not set. Use /auth endpoint beforehand.`);
    }
    const cart = await ref(user.cart)?.load();
    if(!cart){
      throw new UnprocessableEntityException("This user doesn't have a cart to place an order.");
    }
    await this.orderRepo.createOrderFromCart(cart, placeOrderDTO);
    await this.dbService.em.flush(); //This assures atomicity, since it assures the execution in one transaction in mode all-or-nothing commit
  }

  //@Delete('remove')
  //TODO - Not implemented yet

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getListAddresses(@Query('limit', new DefaultValuePipe(-1), new ParseIntPipe({ optional: true })) limit?: number) {
    const queried = limit === -1 ? await this.orderRepo.findAll() : await this.orderRepo.findAll({ limit: limit });

    for(const order of queried){
      await order.orderItems.load();
    }
    return queried.map((order) => {
      return GetOrderDTO.from(order); 
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getCart(@Param('id', ParseIntPipe) id: number) {
    const foundOrder = await this.orderRepo.findOne(id);
    if(!foundOrder){
      throw new NotFoundException('Order could not be found!');
    }
    await foundOrder.orderItems.load(); //We need to ensure order.products is initialized before processing it
    return GetOrderDTO.from(foundOrder);
  }

}
