import { Entity, EntityRepositoryType, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { ProductRepository } from './product.repository';

@Entity({ repository: () => ProductRepository })
export class Product {

  [EntityRepositoryType]?: ProductRepository;
  [OptionalProps]?: 'createdAt';

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property()
  weight!: number;

  @Property()
  buyingPrice!: number;

  @Property()
  sellingPrice!: number;

  @Property()
  stock!: number;

  @Property()
  imgURL?: string;

  @Property()
  createdAt = new Date();

}