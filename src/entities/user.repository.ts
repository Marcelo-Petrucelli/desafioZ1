import { EntityRepository } from '@mikro-orm/mysql';
import { User } from '../entities/user.entity';

export class UserRepository extends EntityRepository<User> {
  
  async findUserByIdOrEmail({srcId, srcEmail}: {srcId?: number, srcEmail?: string}) : Promise<User | null> {
    if(!srcId && !srcEmail){
        return null;
    }

    if(!srcId){
        return await this.findOne({ email: srcEmail });
    }      
    return await this.findOne(srcId); //same as { id: srcId }
  }
  
}