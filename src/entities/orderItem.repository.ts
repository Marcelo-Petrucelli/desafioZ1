import { EntityRepository } from '@mikro-orm/mysql';
import { OrderItem } from 'src/entities/orderItem.entity';

export class OrderItemRepository extends EntityRepository<OrderItem> {
    
}