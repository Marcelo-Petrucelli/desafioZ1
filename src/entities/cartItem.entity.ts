import { Entity, EntityRepositoryType, ManyToOne, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItemRepository } from './cartItem.repository';
import { Product } from 'src/entities/product.entity';
import { Cart } from 'src/entities/cart.entity';

//Caso não hajam informações adicionais, essa entidade inteira poderia ser subistituida por apenas uma relação de ManyToMany de Product e Cart
@Entity({ repository: () => CartItemRepository })
export class CartItem {

  [EntityRepositoryType]?: CartItemRepository;

  @PrimaryKey()
  id!: number;

  @OneToOne()
  product!: Product;

  @ManyToOne()
  cart!: Cart;

  @Property()
  quantity!: number;

}