import { Collection, Entity, EntityRepositoryType, Enum, ManyToMany, OneToMany, OptionalProps, PrimaryKey, Property, types } from '@mikro-orm/core';
import { OrderRepository } from '../entities/order.repository';
import { OrderItem } from '../entities/orderItem.entity';

@Entity({ repository: () => OrderRepository })
export class Order {

  [EntityRepositoryType]?: OrderRepository;
  [OptionalProps]?: 'createdAt';

  @PrimaryKey()
  id!: number;

  @Property({ type: types.float })
  total!: number;

  @OneToMany({ mappedBy: 'order', orphanRemoval: true })
  orderItems = new Collection<OrderItem>(this);

  @Enum(() => PaymentMethod)
  paymentMethod!: PaymentMethod;

  @Property()
  createdAt = new Date();

}

export enum PaymentMethod {
  PIX = 'pix',
  BOLETO = 'boleto',
  CARTAO = 'cartao',
}