import { EntityRepository } from '@mikro-orm/mysql';
import { CartItem } from 'src/entities/cartItem.entity';

export class CartItemRepository extends EntityRepository<CartItem> {
    
}