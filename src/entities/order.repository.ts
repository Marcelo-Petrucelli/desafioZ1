import { EntityRepository } from '@mikro-orm/mysql';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';
import { OrderItem } from '../entities/orderItem.entity';
import { OrderItemRepository } from '../entities/orderItem.repository';
import { PlaceOrderDTO } from '../dtos/order/place.order.dto';

export class OrderRepository extends EntityRepository<Order> {
    
  async createOrderFromCart(cart: Cart, placeOrderDTO: PlaceOrderDTO){
    const orderItemRepo: OrderItemRepository = this.em.getRepository(OrderItem);

    await cart.cartItems.load(); //We need to ensure cart.cartItem is initialized before processing it
    if(cart.cartItems.length <= 0){
      throw new InternalServerErrorException("Can't place order. Cart doesn't have products in it. Cart should only exists with products inside.");
    }

    const newOrder = this.create({
      total: cart.cartItems.reduce<number>((sum: number, cartItem: CartItem) => {
        return sum + (cartItem.product.sellingPrice * cartItem.quantity);
      }, 0),
      paymentMethod: placeOrderDTO.paymentMethod,
    });

    const orderItems: OrderItem[] = [];
    for(const cartItem of cart.cartItems){
      const quantity = cartItem.quantity;
      cartItem.product.stock -= quantity;

      if(cartItem.product.stock <= 0){
        throw new BadRequestException(`Can't place order. Product in Cart with Id ${cartItem.product.id} doesn't have enough (${quantity}) stock items to be selled.`);
      }

      const newOrderItem = orderItemRepo.create({
        order: newOrder,
        product: cartItem.product,
        quantity: quantity
      });

      orderItems.push(newOrderItem);

      this.em.persist(cartItem.product); //Quantity change
    }

    newOrder.orderItems.add(orderItems);

    this.em.persist(newOrder);
    this.em.remove(cart);
  }

}