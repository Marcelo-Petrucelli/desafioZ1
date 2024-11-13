import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem {

   @PrimaryKey()
   id!: number;

   @OneToOne()
   product!: Product;

   @ManyToOne()
   cart!: Cart;

   @Property()
   quantity!: number;

}