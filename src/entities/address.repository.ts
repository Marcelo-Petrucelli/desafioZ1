import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { AddressDTO } from 'src/dtos/address/address.dto';

export class AddressRepository extends EntityRepository<Address> {

	async createAddressFromDTO(user: User, addressDTO: AddressDTO){   
		const createdAddress = this.create({ //Send this to the Entity, as some static 'to' method
				owner: user,
				cep: addressDTO.cep,
				state: addressDTO.state,
				city: addressDTO.city,
				district: addressDTO.district,
				street: addressDTO.street,
				number: addressDTO.number
			});

		this.em.persist(createdAddress);
	}
	
}