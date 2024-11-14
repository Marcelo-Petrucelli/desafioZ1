import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AddressRepository } from 'src/entities/address.repository';
import { User } from 'src/entities/user.entity';

@Entity({ repository: () => AddressRepository })
export class Address {

  [EntityRepositoryType]?: AddressRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  city!: String;

  @Property()
  state!: String;

  @Property({ length: 8 })
  cep!: String;

  @Property()
  street!: String;

  @Property()
  number!: number;

  @Property()
  district!: String;

  @ManyToOne()
  owner!: User;

}