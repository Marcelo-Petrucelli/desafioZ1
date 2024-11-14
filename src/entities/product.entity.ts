import { Entity, EntityRepositoryType, PrimaryKey, Property } from '@mikro-orm/core';
import { ProductRepository } from './product.repository';

@Entity({ repository: () => ProductRepository })
export class Product {

  [EntityRepositoryType]?: ProductRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: String;

  @Property({ type: 'text' })
  description!: String;

  @Property()
  weight!: number;

  @Property()
  buyingPrice!: number;

  @Property()
  sellingPrice!: number;

  @Property()
  stock!: number;

  @Property()
  imgURL?: String;

}