import { Collection, Entity, EntityRepositoryType, OneToMany, OneToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { UserRepository } from './user.repository';
import { Address } from 'src/entities/address.entity';
import { Session } from 'src/entities/session.entity';
import { Cart } from 'src/entities/cart.entity';

@Entity({ repository: () => UserRepository })
export class User implements Express.User {

  [EntityRepositoryType]?: UserRepository;

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
  cart?: Ref<Cart>;

  @OneToOne()
  session?: Ref<Session>;

}