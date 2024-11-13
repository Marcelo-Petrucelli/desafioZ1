import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Address {

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