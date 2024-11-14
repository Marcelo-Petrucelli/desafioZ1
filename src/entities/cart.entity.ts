import { Collection, Entity, EntityRepositoryType, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { CartRepository } from 'src/entities/cart.repository';
import { CartItem } from 'src/entities/cartItem.entity';

@Entity({ repository: () => CartRepository })
export class Cart {

  [EntityRepositoryType]?: CartRepository;

  @PrimaryKey()
  id!: number;

  @OneToMany({ mappedBy: 'cart' })
  cartItem = new Collection<CartItem>(this);

  @Property()
  discount!: number;

  @Property()
  createdAt = new Date();

}