import { EntityRepository } from '@mikro-orm/mysql';
import { Address } from 'src/entities/address.entity';

export class AddressRepository extends EntityRepository<Address> {
    
}