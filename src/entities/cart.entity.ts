import { Collection, Entity, EntityRepositoryType, OneToMany, OneToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { CartRepository } from 'src/entities/cart.repository';
import { CartItem } from 'src/entities/cartItem.entity';
import { User } from 'src/entities/user.entity';

@Entity({ repository: () => CartRepository })
export class Cart {

  [EntityRepositoryType]?: CartRepository;
  [OptionalProps]?: 'createdAt';

  @PrimaryKey()
  id!: number;

  @OneToMany({ mappedBy: 'cart', orphanRemoval: true })
  cartItem = new Collection<CartItem>(this);

  @Property()
  discount!: number;

  @Property()
  createdAt = new Date();

  @OneToOne()
  owner!: User;

}