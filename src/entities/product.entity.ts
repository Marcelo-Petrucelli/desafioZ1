import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, OptionalProps, PrimaryKey, Property, types } from '@mikro-orm/core';
import { ProductRepository } from '../entities/product.repository';
import { CartItem } from '../entities/cartItem.entity';
import { OrderItem } from '../entities/orderItem.entity';

@Entity({ repository: () => ProductRepository })
export class Product {

  [EntityRepositoryType]?: ProductRepository;
  [OptionalProps]?: 'createdAt';

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: types.text })
  description!: string;

  @Property({ type: types.float })
  weight!: number;

  @Property({ type: types.float })
  buyingPrice!: number;

  @Property({ type: types.float })
  sellingPrice!: number;

  @Property({ unsigned: true })
  stock!: number;

  /*@Property()       //TODO - Implement service to read image, save it locally and set imgURL
  imgURL?: string;*/

  @Property()
  createdAt = new Date();

  @OneToMany({ mappedBy: 'product', orphanRemoval: true })
  cartItems = new Collection<CartItem>(this);

  @OneToMany({ mappedBy: 'product' })
  orderItems = new Collection<OrderItem>(this);
}