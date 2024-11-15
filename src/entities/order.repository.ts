import { EntityRepository } from '@mikro-orm/mysql';
import { Order } from 'src/entities/order.entity';

export class OrderRepository extends EntityRepository<Order> {
    
}