import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, OptionalProps, PrimaryKey, Property, types } from '@mikro-orm/core';
import { ProductRepository } from 'src/entities/product.repository';
import { CartItem } from 'src/entities/cartItem.entity';
import { Order } from 'src/entities/order.entity';

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

  @Property()
  stock!: number;

  /*@Property()       //TODO - Implement service to read image, save it locally and set imgURL
  imgURL?: string;*/

  @Property()
  createdAt = new Date();

  @OneToMany({ mappedBy: 'product', orphanRemoval: true })
  cartItems = new Collection<CartItem>(this);

  @ManyToMany()
  orders = new Collection<Order>(this);
}