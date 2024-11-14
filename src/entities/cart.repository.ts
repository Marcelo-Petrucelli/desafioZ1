import { EntityRepository } from '@mikro-orm/mysql';
import { Cart } from 'src/entities/cart.entity';

export class CartRepository extends EntityRepository<Cart> {
    
}