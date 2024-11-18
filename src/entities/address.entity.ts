import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AddressRepository } from '../entities/address.repository';
import { User } from '../entities/user.entity';

@Entity({ repository: () => AddressRepository })
export class Address {

  [EntityRepositoryType]?: AddressRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  city!: string;

  @Property()
  state!: string;

  @Property({ length: 8 })
  cep!: string;

  @Property()
  street!: string;

  @Property()
  number!: number;

  @Property()
  district!: string;

  @ManyToOne()
  owner!: User;

}