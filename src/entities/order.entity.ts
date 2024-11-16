import { Collection, Entity, EntityRepositoryType, Enum, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { OrderRepository } from 'src/entities/order.repository';
import { Product } from 'src/entities/product.entity';

@Entity({ repository: () => OrderRepository })
export class Order {

  [EntityRepositoryType]?: OrderRepository;

  @PrimaryKey()
  id!: number;

  @ManyToMany({ mappedBy: 'orders' })
  products = new Collection<Product>(this);

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