import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItemRepository } from 'src/entities/cartItem.repository';
import { Product } from 'src/entities/product.entity';
import { Cart } from 'src/entities/cart.entity';

//If there are no additional information fields, this entity may be swapped simply by a ManyToMany between Product and Cart
@Entity({ repository: () => CartItemRepository })
export class CartItem {

  [EntityRepositoryType]?: CartItemRepository;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ eager: true })
  product!: Product;

  @ManyToOne()
  cart!: Cart;

  @Property()
  quantity!: number;

}