import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {

   @PrimaryKey()
   id!: number;

   @Property()
   name!: String;

   @Property({ type: 'text' })
   description!: String;

   @Property()
   weight!: String;

   @Property()
   buyingPrice!: number;

   @Property()
   sellingPrice!: number;

   @Property()
   stock!: number;

   @Property()
   imgURL!: String;

}