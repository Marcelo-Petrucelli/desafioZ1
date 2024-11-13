import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { Session } from './session.entity';

@Entity()
export class User implements Express.User {

   @PrimaryKey()
   id!: number;

   @Property()
   email!: string;

   @Property()
   password!: string;

   @Property()
   fullName!: string;

   @OneToMany({ mappedBy: 'owner', lazy: true })
   addresses = new Collection<Address>(this);

   @OneToOne()
   cart!: Cart;

   @OneToMany({ mappedBy: 'user', lazy: true })
   session!: Session;
}