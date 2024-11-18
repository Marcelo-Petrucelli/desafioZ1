import { Collection, Entity, EntityRepositoryType, OneToMany, OneToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { CartRepository } from '../entities/cart.repository';
import { CartItem } from '../entities/cartItem.entity';
import { User } from '../entities/user.entity';

@Entity({ repository: () => CartRepository })
export class Cart {

  [EntityRepositoryType]?: CartRepository;
  [OptionalProps]?: 'createdAt';

  @PrimaryKey()
  id!: number;

  @OneToMany({ mappedBy: 'cart', orphanRemoval: true })
  cartItems = new Collection<CartItem>(this);

  @Property({ unsigned: true })
  discount!: number;

  @Property()
  createdAt = new Date();

  @OneToOne()
  owner!: User;

}