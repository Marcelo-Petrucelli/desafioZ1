import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {

   @PrimaryKey()
   id!: number;

   @OneToMany({ mappedBy: 'cart' })
   cartItem = new Collection<CartItem>(this);

   @Property()
   discount!: number;

   @Property()
   createdAt = new Date();

}