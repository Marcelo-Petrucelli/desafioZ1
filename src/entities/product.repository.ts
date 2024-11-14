import { EntityRepository } from '@mikro-orm/mysql';
import { Product } from 'src/entities/product.entity';

export class ProductRepository extends EntityRepository<Product> {
    
}