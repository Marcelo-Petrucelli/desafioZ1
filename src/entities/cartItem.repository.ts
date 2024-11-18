import { EntityRepository } from '@mikro-orm/mysql';
import { CartItem } from '../entities/cartItem.entity';

export class CartItemRepository extends EntityRepository<CartItem> {
    
}