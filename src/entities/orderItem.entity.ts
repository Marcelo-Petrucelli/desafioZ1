import { Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { OrderItemRepository } from 'src/entities/orderItem.repository';
import { Product } from 'src/entities/product.entity';
import { Order } from 'src/entities/order.entity';

//If there are no additional information fields, this entity may be swapped simply by a ManyToMany between Product and Cart
@Entity({ repository: () => OrderItemRepository })
export class OrderItem {

  [EntityRepositoryType]?: OrderItemRepository;

  @PrimaryKey()
  id!: number;

  @ManyToOne({ eager: true })
  product!: Product;

  @ManyToOne()
  order!: Order;

  @Property({ unsigned: true })
  quantity!: number;

}